cd ./Client/Roll10
dotnet publish -c Release
cd ../../
rm -r ./Server/pb_public
mkdir ./Server/pb_public
cp -r ./Client/Roll10/bin/Release/net7.0/publish/wwwroot/_framework ./Server/pb_public/_framework
cp -r ./Client/Roll10/bin/Release/net7.0/publish/wwwroot/css ./Server/pb_public/css
cp -r ./Client/Roll10/bin/Release/net7.0/publish/wwwroot/images ./Server/pb_public/images
cp -r ./Client/Roll10/bin/Release/net7.0/publish/wwwroot/js ./Server/pb_public/js
cp ./Client/Roll10/bin/Release/net7.0/publish/wwwroot/index.html ./Server/pb_public/index.html
cp ./Client/Roll10/bin/Release/net7.0/publish/wwwroot/redirect.html ./Server/pb_public/redirect.html

./Server/pocketbase serve --http="roll10.org:80" --https="roll10.org:443"
