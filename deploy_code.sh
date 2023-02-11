cd ./Client/Roll10Angular
npm run build
cd ../../
sudo rm -r ./Server/pb_public
sudo cp -r ./Client/Roll10Angular/dist/roll10-angular ./Server/pb_public

sudo ./Server/pocketbase serve --http="roll10.org:80" --https="roll10.org:443"
