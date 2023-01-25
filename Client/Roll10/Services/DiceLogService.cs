using System.Reactive.Disposables;
using System.Reactive.Subjects;

namespace Roll10.Services
{
    public record DiceLogEntry(
        string title,
        string diceroll,
        int rolledamount,
        //DateTime created,
        string id,
        string room_id = ""
    );

    public class DiceLogService: IDisposable
    {
        private readonly IApiService _apiService;
        private readonly PocketbaseService _pb;
        private readonly ToastService _toastService;
        public List<DiceLogEntry> DiceLog { get; set; } = new();
        private bool _hasSynced;

        public Subject<(DiceLogEntry, bool)> AddDiceLogEntrySubject { get; } = new();
        private readonly List<IDisposable> _subs;

        public DiceLogService(IApiService apiService, PocketbaseService pb, ToastService toastService)
        {
            _apiService = apiService;
            _pb = pb;
            _toastService = toastService;
            _subs = new List<IDisposable>
            {
                AddDiceLogEntrySubject.Subscribe(values =>
                {
                    _ = Task.Run(async () =>
                    {
                        await AddEntry(values.Item1, values.Item2);
                    });
                })
            };
        }

        public async Task SyncDiceLog()
        {
            if (!_hasSynced)
            {
                var events = await _pb.GetLogs();
                var currentIds = DiceLog.Select(d => d.id);
                events = events.Where(e => !currentIds.Contains(e.id)).ToList();
                DiceLog.AddRange(events);
                _hasSynced = true;
            }
        }

        public void ClearLog()
        {
            _hasSynced = false;
            DiceLog = new();
        }

        private async Task AddEntry(DiceLogEntry entry, bool directPush = false)
        {
            var user = await _pb.GetUser();
            if(!string.IsNullOrEmpty(user?.diceroom) && !directPush)
            {
                await _pb.UploadDiceLogEntry(entry, user.diceroom);
            }

            if (!DiceLog.Select(d => d.id).Contains(entry.id))
            {
                DiceLog.Add(entry);
                await _toastService.ShowToast(new ToastMessage(
                    ToastType.Info,
                    $"<p class=\"text-center font-bold\">{entry.title}</p><p class=\"text-center italic\">{entry.diceroll}</p><p class=\"text-center font-bold text-lg\">{entry.rolledamount}</p>"
                ));
            }
        }

        public Task JoinDiceRoom(string roomId)
        {
            throw new NotImplementedException();   
        }

        public void Dispose()
        {
            AddDiceLogEntrySubject.Dispose();
            foreach (var sub in _subs) sub.Dispose();
        }
    }   
}