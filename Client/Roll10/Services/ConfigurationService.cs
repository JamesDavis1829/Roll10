namespace Roll10.Services
{
    public static class ConfigurationService
    {
        #if RELEASE
        public static readonly string Url = "https://roll10.org";
        #else
        public static readonly string Url = "http://localhost:8090";
        #endif
    } 
}