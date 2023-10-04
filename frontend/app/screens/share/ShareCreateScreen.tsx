import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  ImageBackground, ToastAndroid
} from 'react-native';
import ShareLayout from "@/screens/share/ShareLayout";
import {recipeStyles} from "@/styles/recipeStyles";
import {TEXT_COLOR} from "@/assets/colors/colors";
import {styles} from "@/styles/styles";
import useInput from "@/hooks/useInput";
import PlainInput from "@/components/PlainInput";
import addressAutocompleteApi from "@/apis/addressAutocompleteApi";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import ingredientAutocompleteApi from "@/apis/ingredientAutocompleteApi";
import BasicBadge from "@/components/BasicBadge";
import {cameraIcon, closeIcon} from "@/assets/icons/icons";
import ShareIngredientItem from "@/components/ShareIngredientItem";
import {SvgXml} from "react-native-svg";
import GetImageFrom from "@/components/GetImageFrom";
import {useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";
import shareApi from "@/apis/shareApi";

const ShareCreateScreen = ({navigation}:any) => {
  const profileImageUrl = '';
  const [locationList, setLocationList] = useState<any[]>([]);
  const [location, setLocation] = useState<any>();
  const [ingredientList, setIngredientList] = useState<any[]>([]);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const {memberId} = useSelector((state:RootState)=>state.userReducer);

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

  const checkIngredient = async (keyword: string) => {
    try {
      const res = await ingredientAutocompleteApi.check({keyword: keyword})
      if (res.status === 200) {
        setIngredientList(res.data.data.ingredients)
      }
    } catch (err) {
      console.log(err);
    }
  }

  const title = useInput({
    placeholder: '제목',
    title: '제목',
  })
  const locationInput = useInput({
    placeholder: '검색',
    title: '나눔 장소',
    nowNum: 1,
    onChange: checkLocation,
  })
  const ingredientInput = useInput({
    placeholder: '검색',
    title: '나눔 재료',
    nowNum: 2,
    onChange: checkIngredient,
  })

  function onSelectLocation(item: any) {
    setLocation(item)
  }

  function checkDuplicateIngredient(item: any){
    return (
      ingredients.every((ingredient: any) => {
        if (ingredient.ingredientName !== item.ingredientName){
          return true;
        }
      })
    );
  }

  function onSelectIngredient(item: any){
    if (checkDuplicateIngredient(item)){
      setIngredients([...ingredients, {...item, amount: 1}]);
    }
  }

  function onClickPlus(idx: number){
    if (ingredients[idx].amount < 9){
      const _ingredients = [...ingredients];
      _ingredients[idx].amount = ingredients[idx].amount + 1;
      setIngredients(_ingredients);
    }
  }

  function onClickMinus(idx: number){
    if (ingredients[idx].amount > 1){
      const _ingredients = [...ingredients];
      _ingredients[idx].amount = ingredients[idx].amount - 1;
      setIngredients(_ingredients);
    }
  }

  function onClickClose(idx: number){
    const _ingredients = [...ingredients];
    _ingredients.splice(idx, 1);
    setIngredients(_ingredients);
  }

  function getImage(image: any){
    if (image.assets.length + images.length > 5){
      return
    }
    const _images = [...images, ...image.assets];
    setImages(_images);
  }

  function closeImage(idx: number){
    const _images = [...images];
    _images.splice(idx, 1);
    setImages(_images);
  }

  function onToast(text: string){
    ToastAndroid.showWithGravity(
      text,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    )
  }

  async function getImageUrl(){
    images.forEach((image)=>{
      try {
        // TODO: imageUrl 받는 코드
      } catch (err) {
        console.log(err)
      }
    })

  }

  async function tryShare(){
    if (!title.text){
      onToast('제목을 입력해주세요');
      return
    }
    if (!location?.locationName){
      onToast('나눔장소를 등록해주세요');
      return
    }
    if (!ingredients){
      onToast('나눔 식재료를 추가해주세요');
      return
    }
    if (!content){
      onToast('설명을 추가해주세요');
      return
    }
    if (!images){
      onToast('사진을 1개이상 추가해주세요');
      return
    }

    const _ingredients = ingredients.map((i)=> {
      return {
        ingredientInfoId: i.ingredientInfoId,
        amount: i.amount,
      }
    })

    const inputData = {
      shareIngredients: _ingredients,
      shareBoardWriteRequest: {
        memberId: memberId,
        locationId: location.locationId,
        title: title.text,
        content: content
      }
    }

    try {
      const res = await shareApi.createShare(inputData);
      if (res.status === 200){
        console.log(res)
        // TODO: 나눔글 등록 후 navigate
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ShareLayout title="나눔글 쓰기" optionTitle="등록">
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={[{width: '100%', padding: 15}]}>
            <View>
              <PlainInput {...title}/>
            </View>
            <View>
              <AutoCompleteInput {...locationInput} textList={locationList} keyValue='locationId' name='locationName' onSelect={onSelectLocation}/>
            </View>
            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
              {
                location?.locationName && <BasicBadge color='#3093EF' name={location.locationName} icon={closeIcon} onPress={()=>{setLocation({})}}/>
              }
            </View>
            <View>
              <AutoCompleteInput {...ingredientInput} textList={ingredientList} keyValue='ingredientInfoId' name='ingredientName' onSelect={onSelectIngredient}/>
            </View>
            <View style={{marginBottom: 20}}>
              {
                ingredients.map((item, index)=>{
                  return (
                      <React.Fragment key={`ingredient${index}`}>
                        <ShareIngredientItem name={item.ingredientName} amount={item.amount} onPressMinus={()=>onClickMinus(index)} onPressPlus={()=>onClickPlus(index)} onPressClose={()=>onClickClose(index)}/>
                      </React.Fragment>
                    )
                })
              }
            </View>
            <View style={{marginBottom: 20}}>
              <View style={{marginBottom: 10}}>
                <Text style={[styles.font, {fontSize: 20}]}>자세한 설명</Text>
              </View>
              <View>
                <TextInput
                  value={content}
                  placeholder={`역삼동에 올릴 게시글 내용을 작성해주세요.\n\n나눔 금지 물품은 제한될 수 있습니다.`}
                  multiline={true}
                  textAlignVertical='top'
                  style={[styles.font, {width: '100%', minHeight: 300, borderWidth: 1, padding: 20, borderRadius: 16, fontSize: 20}]}
                />
              </View>
            </View>
            <View>
              <View style={{marginBottom: 10}}>
                <Text style={[styles.font, {fontSize: 20}]}>사진 등록</Text>
              </View>
              <View>
                <View style={{flexWrap: 'wrap', flexDirection: 'row', width: '100%'}}>
                  <View style={{justifyContent: 'center', alignItems: 'center', width: 70, height: 70, margin: 10, marginLeft: 0}}>
                    <TouchableWithoutFeedback onPress={()=>setIsVisible(true)}>
                      <View style={{backgroundColor: '#D9D9D9', justifyContent: 'center', alignItems: 'center', width: 70, height: 70}}>
                        <SvgXml
                          xml={cameraIcon}
                          width={40}
                          height={40}
                        />
                        <View>
                          <Text style={[styles.font, {fontSize: 16}]}>{images.length}/5</Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  {
                    images.map((image, index)=>{
                      return (
                        <React.Fragment key={`image${index}`}>
                          <View style={{position: 'relative'}}>
                            <View style={{justifyContent: 'center', alignItems: 'center', width: 70, height: 70, margin: 10, marginLeft: 0}}>
                              <ImageBackground source={{uri: image.uri}}
                                               style={{width:'100%', height:'100%'}}
                              />
                            </View>
                            <TouchableWithoutFeedback onPress={()=>closeImage(index)}>
                              <View style={[{position: 'absolute', borderRadius: 100, backgroundColor: 'red', width: 30, height: 30, justifyContent: 'center', alignItems: 'center', right: 0}]}>
                                <SvgXml
                                  xml={closeIcon}
                                  width={15}
                                  height={15}
                                />
                              </View>
                            </TouchableWithoutFeedback>
                          </View>
                        </React.Fragment>
                      )
                    })
                  }
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        { isVisible &&
          <GetImageFrom getImage={(image: any)=>{getImage(image)}} setIsVisible={()=>setIsVisible(false)} selectionLimit={5-images.length}/>
        }
      </View>
    </ShareLayout>
  )
}

export default ShareCreateScreen;
