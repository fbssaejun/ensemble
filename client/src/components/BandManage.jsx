import { Fragments } from 'react';


export default function BandManage(props) {

  

  return (
    <Fragments>

      <MyBandList /> -> <MyBand> -> <SpotsList> -> <Spot> 

      {/* This is for spots, with the band name */}
      <BandsIAmInList /> -> <MyBand> -> <Spot>
      
    </Fragments>
  );
}