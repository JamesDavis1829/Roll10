namespace Roll10.Services
{
    public record DiceLogEntry(
        string Title,
        string DiceRoll,
        string RolledAmount,
        DateTime Created
    );

    public class DiceLogService
    {
        IApiService _apiService;

        public DiceLogService(IApiService apiService)
        {
            _apiService = apiService;
        }

        public readonly List<DiceLogEntry> DiceLog = new List<DiceLogEntry>();

        public Task JoinDiceRoom(string roomId)
        {
            throw new NotImplementedException();   
        }
    }   
}