import { useEffect } from 'react';
import './styles.css';
import mapMarker from '../../assets/mapMarker.svg';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  location: string;
}

interface PlaceData {
  y: string;
  x: string;
}

const KakaoMap = ({ location }: KakaoMapProps) => {
  useEffect(() => {
    var mapContainer = document.getElementById('map'),
      mapOption = {
        center: new kakao.maps.LatLng(37.5665, 126.978), // 서울시청
        level: 3, // 지도의 확대 레벨
      };
    var map = new kakao.maps.Map(mapContainer as HTMLElement, mapOption);

    location ? location : (location = '서울시청');
    // 커스텀오버레이
    var content = `<div class="custom-marker">
        <div class="wrap"><img class="marker" src=${mapMarker} alt="MapMarker"/></div>
        <span class="location">${location}</span>
      </div>`;
    var customOverlay = new kakao.maps.CustomOverlay({
      position: map.getCenter(),
      content: content,
    });

    if (location) {
      // 키워드로 장소를 검색
      const placeSearchCB = (
        data: PlaceData[],
        status: kakao.maps.services.Status,
        pagination: any,
      ) => {
        if (status === kakao.maps.services.Status.OK) {
          const firstPlace = data[0];
          const coords = new kakao.maps.LatLng(parseFloat(firstPlace.y), parseFloat(firstPlace.x));
          customOverlay.setPosition(coords);
          map.setCenter(coords);
        }
      };

      // 장소 검색 객체를 생성
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(location, placeSearchCB);

      // 지도 확대/축소 시에도 마커 위치를 유지하기 위한 이벤트 리스너
      kakao.maps.event.addListener(map, 'zoom_changed', () => {
        if (location) {
          ps.keywordSearch(location, placeSearchCB);
        }
      });
    }

    customOverlay.setMap(map);
  }, [location]);

  return (
    <div
      id="map"
      style={{ width: '100%', height: '280px', borderRadius: '10px', marginTop: '1rem' }}
    />
  );
};

export default KakaoMap;
