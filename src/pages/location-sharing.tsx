/*
import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 0,
  lng: 0,
};

const LocationSharing = () => {
  const [position, setPosition] = useState<{ lat: number, lon: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lon: longitude });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
      <h1>Location Sharing</h1>
      {position ? (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={{ lat: position.lat, lng: position.lon }}
          >
            {// マーカーをユーザーの現在地に表示 }
            <Marker position={{ lat: position.lat, lng: position.lon }} />
          </GoogleMap>
        </LoadScript>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LocationSharing;
*/

/*
import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const LocationSharing = () => {
  const [position, setPosition] = useState<{ lat: number, lon: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        console.log('Latitude:', latitude, 'Longitude:', longitude);  // デバッグ用
        setPosition({ lat: latitude, lon: longitude });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
      <h1>Location Sharing</h1>
      {position ? (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={{ lat: position.lat, lng: position.lon }}
          >
            <Marker position={{ lat: position.lat, lng: position.lon }} />
          </GoogleMap>
        </LoadScript>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LocationSharing;
*/

/*
import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import io from "socket.io-client";

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 0,
  lng: 0,
};

let socket: any;

const LocationSharing = () => {
  const [position, setPosition] = useState<{ lat: number | null, lon: number | null }>({ lat: null, lon: null });

  useEffect(() => {
    // サーバーとのSocket.io接続
    socket = io();

    // 現在地を取得
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lon: longitude });

        // サーバーに位置情報を送信
        socket.emit("sendPosition", { latitude, longitude });
      });
    }

    // 他のユーザーの位置情報を受信
    socket.on("receivePosition", (pos: { latitude: number, longitude: number }) => {
      console.log("Received position from another user: ", pos);
      // 他のユーザーの位置を地図上に表示するロジックを追加することもできます
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Real-time Location Sharing</h1>
      <p>Latitude: {position.lat}</p>
      <p>Longitude: {position.lon}</p>
      
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={position.lat && position.lon ? { lat: position.lat, lng: position.lon } : center}
        >
          {position.lat && position.lon && (
            <Marker position={{ lat: position.lat, lng: position.lon }} />
          )}
          {// 他のユーザーの位置もマーカーとして表示可能 }
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LocationSharing;
*/

/*
import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import io from "socket.io-client";

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 0,
  lng: 0,
};

let socket: any;

const LocationSharing = () => {
  const [position, setPosition] = useState<{ lat: number | null, lon: number | null }>({ lat: null, lon: null });
  const [otherUsers, setOtherUsers] = useState<{ id: string, lat: number, lon: number }[]>([]);

  useEffect(() => {
    // サーバーとのSocket.io接続
    socket = io();

    // 現在地を取得
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lon: longitude });

        // サーバーに位置情報を送信
        socket.emit("sendPosition", { latitude, longitude });
      });
    }

    // 他のユーザーの位置情報を受信
    socket.on("receivePosition", (pos: { id: string, latitude: number, longitude: number }) => {
      setOtherUsers((prevUsers) => {
        const existingUserIndex = prevUsers.findIndex(user => user.id === pos.id);
        if (existingUserIndex > -1) {
          // 既存ユーザーの位置を更新
          const updatedUsers = [...prevUsers];
          updatedUsers[existingUserIndex] = { id: pos.id, lat: pos.latitude, lon: pos.longitude };
          return updatedUsers;
        } else {
          // 新しいユーザーを追加
          return [...prevUsers, { id: pos.id, lat: pos.latitude, lon: pos.longitude }];
        }
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Real-time Location Sharing</h1>
      <p>Latitude: {position.lat}</p>
      <p>Longitude: {position.lon}</p>
      
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={position.lat && position.lon ? { lat: position.lat, lng: position.lon } : center}
        >
          {position.lat && position.lon && (
            <Marker position={{ lat: position.lat, lng: position.lon }} />
          )}

          {otherUsers.map((user) => (
            <Marker 
              key={user.id} 
              position={{ lat: user.lat, lng: user.lon }} 
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // 他のユーザーのマーカーは青色に
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LocationSharing;
*/

import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { supabase } from "../utils/supabase";
import io from "socket.io-client";

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 0,
  lng: 0,
};

let socket: any;

const LocationSharing = () => {
  const [position, setPosition] = useState<{ lat: number | null, lon: number | null }>({ lat: null, lon: null });
  const [otherUsers, setOtherUsers] = useState<{ id: string, lat: number, lon: number }[]>([]);

  useEffect(() => {
    // サーバーとのSocket.io接続
    socket = io('http://localhost:3001'); // サーバーが動作しているURLとポートを指定

    // 現在地を取得
    
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lon: longitude });

        // Supabaseに現在のユーザーの位置情報を更新
        updateLocation(latitude, longitude);

        // サーバーに位置情報を送信
        socket.emit("sendPosition", { latitude, longitude });
      });
    }
    
    // 固定位置を指定（例: 新しい緯度と経度をここに設定）
    /*
    const fixedLatitude = 35.71810483222636;
    const fixedLongitude = 139.85832220691972;
    setPosition({ lat: fixedLatitude, lon: fixedLongitude });

    // Supabaseに現在のユーザーの位置情報を更新
    updateLocation(fixedLatitude, fixedLongitude);

    // サーバーに位置情報を送信
    socket.emit("sendPosition", { latitude: fixedLatitude, longitude: fixedLongitude });
    */

    // 他のユーザーの位置情報を取得
    const fetchOtherUsersLocations = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, location_lat, location_lon');

      if (error) {
        console.error("Error fetching users' locations:", error);
      } else {
        const usersWithLocation = data
          .filter(user => user.location_lat && user.location_lon)
          .map(user => ({
            id: user.id,
            lat: user.location_lat,
            lon: user.location_lon
          }));
        setOtherUsers(usersWithLocation);
      }
    };

    fetchOtherUsersLocations();

  }, []);

  return (
    <div>
      <h1>Real-time Location Sharing</h1>
      <p>Latitude: {position.lat}</p>
      <p>Longitude: {position.lon}</p>
      
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={position.lat && position.lon ? { lat: position.lat, lng: position.lon } : center}
        >
          {position.lat && position.lon && (
            <Marker position={{ lat: position.lat, lng: position.lon }} />
          )}

          {otherUsers.map((user) => (
            <Marker 
              key={user.id} 
              position={{ lat: user.lat, lng: user.lon }} 
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // 他のユーザーのマーカーは青色に
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

// 位置情報を更新する関数
const updateLocation = async (latitude: number, longitude: number) => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    console.error('Error fetching user:', error);
    return;
  }

  await supabase
    .from('users')
    .update({ location_lat: latitude, location_lon: longitude })
    .eq('id', user.id);
};

export default LocationSharing;
