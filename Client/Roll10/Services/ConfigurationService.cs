namespace Roll10.Services
{
    public static class ConfigurationService
    {
        #if RELEASE
        public static string Url = "https://roll10.org";
        #else
        public static string Url = "http://localhost:8090";
        #endif
    } 
}