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
        IApiService ApiService;

        public DiceLogService(IApiService apiService)
        {
            ApiService = apiService;
        }

        public List<DiceLogEntry> DiceLog = new List<DiceLogEntry>();

        public Task JoinDiceRoom(string roomId)
        {
            throw new NotImplementedException();   
        }
    }   
}