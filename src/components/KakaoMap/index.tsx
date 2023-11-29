import { useEffect, useState } from 'react';

interface KakaoMapProps {
  location: string;
}

const KakaoMap = ({ location }: KakaoMapProps) => {
  useEffect(() => {
    var mapContainer = document.getElementById('map'),
      mapOption = {
        center: new kakao.maps.LatLng(37.5665, 126.978), // 서울시청
        level: 3, // 지도의 확대 레벨
      };
    var map = new kakao.maps.Map(mapContainer as HTMLElement, mapOption);
    var marker = new kakao.maps.Marker({
      position: map.getCenter(),
    });

    if (location) {
      // 장소 검색 객체를 생성
      const ps = new kakao.maps.services.Places();

      // 키워드로 장소를 검색
      ps.keywordSearch(location, (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          const firstPlace = data[0];
          const coords = new kakao.maps.LatLng(parseFloat(firstPlace.y), parseFloat(firstPlace.x));
          map.setCenter(coords);
          marker.setPosition(coords);
        }
      });
    }

    marker.setMap(map);
  }, [location]);

  return (
    <div
      id="map"
      style={{ width: '95%', height: '360px', borderRadius: '10px', marginTop: '1rem' }}
    >
      {/* <div id="clickLatlng"></div> */}
    </div>
  );
};

export default KakaoMap;
