import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  ImageBackground, TouchableOpacity,
} from 'react-native';
import BottomNavigator from '@/components/BottomNavigator';
import {styles} from '@/styles/styles';
import TopNavigator from '@/components/TopNavigator';
import {useNavigation} from '@react-navigation/native';
import RecipeItem from '@/components/RecipeItem';
import {useRoute} from '@react-navigation/native';
import memberApi from '@/apis/memberApi';
import recipeApi from '@/apis/recipeApi';
import {useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";
import {SvgXml} from "react-native-svg";
import {filledfollowIcon, followIcon} from "@/assets/icons/icons";
import {TEXT_COLOR, TEXT_SUB_COLOR} from "@/assets/colors/colors";
import RecipeList from "@/components/RecipeList";

interface props {
  title?: string;
  optionTitle?: string;
  optionFunction?: Function;
  route?: any;
}

const UserScreen = ({title = '김석주', optionTitle, optionFunction}: props) => {
  const route = useRoute();
  const [id, setId] = useState(route?.params?.id);
  const [nickname, setNickname] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [profileUrl, setProfileUrl] = useState('');
  const [follower, setFollower] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [size, setSize] = useState(5);
  const [like, setLike] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigation = useNavigation();
  const memberId = useSelector((state: RootState) => state.userReducer.memberId);


  // 이 페이지로 넘겨준 데이터 형식
  /*
  const data = {
    id: parseInt(memberId.text),
  };
  */

  useEffect(() => {
    async function setMemberId() {
      const memberInfoRequest = await memberApi.otherDetail(route.params);
      const response = memberInfoRequest.data;
      setFollower(response.data.memberInfo.followCount);
      setNickname(response.data.memberInfo.nickname);
      setProfileUrl(response.data.memberInfo.profileImageUrl);

      const followRes = await memberApi.toggleFollow( memberId, route.params.id);
      setLike(!followRes.data.data.flag);
      await memberApi.toggleFollow( memberId, route.params.id);
    }
    setMemberId();
  }, []);

  async function getRecipes() {
    console.log(page, totalPage);
    try {
      if (page > totalPage) return
      const res = await recipeApi.getOthersRecipe(id, memberId, page, size);
      if (res.status === 200) {
        if (page === 0) {
          setRecipes([...res.data.data.recipe]);
        } else {
          setRecipes([...recipes, ...res.data.data.recipe])
        }
        setTotalPage(res.data.data.totalPage);
        setPage(page + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRecipes();
  }, [id]);

  const pressAfter = async () => {
    setIsDisabled(pre => true);
    const followRes = await memberApi.toggleFollow( memberId, id );
    setLike(followRes.data.data.flag);
    setIsDisabled(pre => false);
    const memberInfoRequest = await memberApi.otherDetail(route.params);
    const response = memberInfoRequest.data;
    setFollower(response.data.memberInfo.followCount);
  };

  return (
    <View style={styles.layout}>
      <TopNavigator
        title={nickname}
        optionTitle={optionTitle}
        optionFunction={optionFunction}
      />
      <View style={[{width: '100%', flex: 1}]}>
        <View style={{width: '100%'}}>
          <View
            style={{
              width: '100%',
              padding: 10,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={{width: 100, height: 100, borderRadius: 999}}>
                {
                  profileUrl && <Image
                        source={{uri: profileUrl}}
                        style={{width: '100%', height: '100%', borderRadius: 999}}
                    />
                }
              </View>
            </View>
            <View style={{}}>
              <View style={{}}>
                <View style={{ flexDirection:'row', justifyContent:'center', marginVertical:3, alignItems: 'center', marginTop: 20}}>
                  <View style={{}}>
                    <TouchableOpacity onPress={pressAfter} disabled={isDisabled}>
                      {like ? <SvgXml
                        xml={filledfollowIcon}
                        width={30}
                        height={30}
                      />:<SvgXml
                        xml={followIcon}
                        width={30}
                        height={30}
                      />}
                    </TouchableOpacity>
                  </View>
                  <View style={{paddingHorizontal: 10}}>
                    <Text style={[styles.font,{fontSize:20, color:TEXT_COLOR}]}>
                      <Text>{follower}</Text>
                      <Text>  팔로워</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <RecipeList
            horizontal={false}
            recipeList={recipes}
            navigation={navigation}
            callNextPage={getRecipes}
          />
        </View>
      </View>
      <View style={{height: 80}} />
      <BottomNavigator now="" />
    </View>
  );
};

export default UserScreen;
