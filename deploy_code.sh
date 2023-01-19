cd ./Client/Roll10
dotnet publish -c Release
cd ../../
rm -r ./Server/pb_public
mkdir ./Server/pb_public
cp ./Client/Roll10/bin/Release/net7.0/wwwroot/_framework ./Server/pb_public/_framework
cp ./Client/Roll10/bin/Release/net7.0/wwwroot/css ./Server/pb_public/css
cp ./Client/Roll10/bin/Release/net7.0/wwwroot/images ./Server/pb_public/images
cp ./Client/Roll10/bin/Release/net7.0/wwwroot/index.html ./Server/pb_public/index.html
