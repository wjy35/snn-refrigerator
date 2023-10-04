import react, {useEffect, useState} from "react";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import {View} from "react-native";
import React from "react";
import BasicBadge from "@/components/BasicBadge";
import {closeIcon} from "@/assets/icons/icons";
import useInput from "@/hooks/useInput";
import addressAutocompleteApi from "@/apis/addressAutocompleteApi";
import memberApi from "@/apis/memberApi";

const PlaceManage = ({memberId}) =>{
  const [now, setNow] = useState<number>(0);
  const [locationList, setLocationList] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await memberApi.getLocation(memberId);
        if (res.status === 200){
          setLocations(res.data.data.location);
        }
      } catch (err) {
        console.log(err)
      }
    };
    init();
  }, []);

  const checkLocation = async (keyword: string) => {
    try {
      const res = await addressAutocompleteApi.check({keyword: keyword})
      if (res.status === 200) {
        setLocationList(res.data.data.locations);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const location = useInput({
    placeholder: '검색',
    nowNum: 1,
    onChange: checkLocation,
  });

  function checkDuplicateLocation(item: any){
    return (
      locations.every((location: any) => {
        if (location.locationName !== item.locationName){
          return true;
        }
      })
    );
  }

  async function removeLocation(idx: number) {
    try {
      const res = await memberApi.postLocation(memberId, idx);
      if (res?.data?.data?.status){
        const _locations = [...locations];
        _locations.splice(idx, 1);
        setLocationList(_locations);
      }
    } catch (err) {
      console.log(err)
    }
  }


  //TODO: ingredient와 동일하게 location 등록이 되지 않음.
  async function onSelectLocation(item: any) {
    if (checkDuplicateLocation(item)){
      try {
        console.log(item.locationId, memberId);
        const res = await memberApi.postLocation(memberId, item.locationId);
        if(res.status === 200) setLocations([...locations, {...item}]);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <View style={{}}>
        <AutoCompleteInput {...location} textList={locationList} keyValue='locationId' name='locationName' onSelect={onSelectLocation}/>
      </View>
      <View>
        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
          {
            locations.map((i, idx) => {
              return (
                <React.Fragment key={`${i.locationName}${idx}`}>
                  <BasicBadge color='#3093EF' name={i.locationName} icon={closeIcon} onPress={()=>{removeLocation(idx)}}/>
                </React.Fragment>
              )
            })
          }
        </View>
      </View>
    </View>
  );
}

export default PlaceManage;
