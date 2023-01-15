namespace Roll10.Services
{
    public class GlobalRefreshService 
{
    public event Action? RefreshRequested;
    public void CallRequestRefresh()
    {
         RefreshRequested?.Invoke();
    }
}
}