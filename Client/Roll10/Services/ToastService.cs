namespace Roll10.Services
{
    public enum ToastType 
    {
        INFO = 0,
        WARNING
    }

    public record ToastMessage(
        ToastType Type,
        string Message
    );

    public class ToastService 
    {
        public List<ToastMessage> Toasts = new List<ToastMessage>();
        public GlobalRefreshService _refreshService;

        public ToastService(GlobalRefreshService refreshService)
        {
            _refreshService = refreshService;
        }

        public async Task ShowToast(ToastMessage message, int msTimeout = 5000)
        {
            Toasts.Add(message);
            _refreshService.CallRequestRefresh();
            await Task.Delay(msTimeout);
            Toasts.Remove(message);
            _refreshService.CallRequestRefresh();
        }
    }   
}