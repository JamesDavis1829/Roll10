namespace Roll10.Services
{
    public record DiceLogEntry(
        string title,
        string diceroll,
        int rolledamount,
        DateTime created,
        string id,
        string room_id = ""
    );

    public class DiceLogService
    {
        private readonly IApiService _apiService;
        private readonly PocketbaseService _pb;
        public readonly List<DiceLogEntry> DiceLog;
        private bool _hasSynced;

        public DiceLogService(IApiService apiService, PocketbaseService pb)
        {
            _apiService = apiService;
            _pb = pb;
            DiceLog = new();
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
        public async Task AddEntry(DiceLogEntry entry, bool directPush = false)
        {
            var user = await _pb.GetUser();
            if(!string.IsNullOrEmpty(user?.diceroom) && !directPush)
            {
                await _pb.UploadDiceLogEntry(entry, user.diceroom);
            }
            
            DiceLog.Add(entry);
        }

        public Task JoinDiceRoom(string roomId)
        {
            throw new NotImplementedException();   
        }
    }   
}