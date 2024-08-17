import { Marker, Popup } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import 'leaflet/dist/leaflet.css';

function App() {
    return (
        <>
            <div className="mt-4 mb-24 ">
                <div className=" relative">
                    <MapContainer
                        className="markercluster-map !h-[800px] z-10"
                        center={[30.505, 54.09]}
                        zoom={5.3}
                        maxZoom={18}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />

                        <Marker position={[30.505, 55.09]}>
                            <Popup>
                                <p>تعداد مجوز: 4</p>
                            </Popup>
                        </Marker>
                        <Marker position={[30.505, 50.09]}>
                            <Popup>
                                <p>تعداد مجوز: 4</p>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </>
    );
}

export default App;
