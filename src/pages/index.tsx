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

export default function Home() {
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
      // 他のユーザーの位置を地図上に表示
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
}
*/

import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
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

export default function Home() {
  const router = useRouter();
  const [position, setPosition] = useState<{ lat: number | null, lon: number | null }>({ lat: null, lon: null });

  useEffect(() => {
    // ログイン状態をチェックする（簡易的な例）
    const isLoggedIn = false; // 実際にはセッションやトークンなどを確認するロジックを実装

    if (!isLoggedIn) {
      router.push('/login');
      return; // ログインしていない場合は後続の処理をスキップ
    }

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
      // 他のユーザーの位置を地図上に表示
    });

    return () => {
      socket.disconnect();
    };
  }, [router]);

  // ログインしていない場合はログインページにリダイレクトされるため、以下のコンテンツは表示されない
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
          {/* 他のユーザーの位置もマーカーとして表示可能 */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}



