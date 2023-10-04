import react, {useEffect, useState} from 'react';
import React from 'react';
import BasicBadge from '@/components/BasicBadge';
import {closeIcon} from '@/assets/icons/icons';
import {View} from 'react-native';
import AutoCompleteInput from '@/components/AutoCompleteInput';
import useInput from '@/hooks/useInput';
import ingredientAutocompleteApi from '@/apis/ingredientAutocompleteApi';
import memberApi from '@/apis/memberApi';

function HateIngredient({memberId}) {
  const [excludeIngredientList, setExcludeIngredientList] = useState<any[]>([]);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [now, setNow] = useState(3);

  useEffect(() => {
    const init = async () => {
      console.log(memberId);
      const res = await memberApi.memberHate(memberId);
      console.log(res.data.data);
      setIngredients(() => res.data.data.ingredient);
    };
    init();
  }, []);

  const checkExcludeIngredient = async (keyword: string) => {
    try {
      const res = await ingredientAutocompleteApi.check({keyword: keyword});
      if (res.status === 200) {
        setExcludeIngredientList(res.data.data.ingredients);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const excludeIngredient = useInput({
    placeholder: '검색',
    title: '제외 식재료 관리',
    nowNum: 3,
    onChange: checkExcludeIngredient,
  });

  function checkDuplicateIngredient(item: any) {
    return ingredients.every((ingredient: any) => {
      if (ingredient.ingredientName !== item.ingredientName) {
        return true;
      }
    });
  }

  function onPressIn(nowNum: number) {
    setNow(nowNum);
  }

  function onSelectIngredient(item: any) {
    console.log(item);
    const execute = async () => {
      if (checkDuplicateIngredient(item)) {
        const ingredientId = item.ingredientId;
        const res = await memberApi.addMemberHate(memberId, ingredientId);
        console.log(res.data.data);
        if (res.status === 200) {
          setIngredients([...ingredients, {...item}]);
        }
      }
    };
    execute();
  }

  function onBlurIngredient() {
    excludeIngredient.reset();
    setExcludeIngredientList([]);
  }

  async function removeIngredient(idx: number) {
    const res = await memberApi.deleteMemberHate(memberId, idx);
    if (res.status !== 200) {
      return;
    }
    const _ingredients = [...ingredients];
    _ingredients.splice(idx, 1);
    setIngredients(_ingredients);
  }
  //TODO: onSelectIngredient가 작동을 하지 않음.
  return (
    <View style={{width: '90%'}}>
      <AutoCompleteInput
        {...excludeIngredient}
        textList={excludeIngredientList}
        onPressIn={onPressIn}
        onBlur={onBlurIngredient}
        keyValue="ingredientInfoId"
        name="ingredientName"
        onSelect={onSelectIngredient}
      />
      <View>
        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
          {ingredients.map((i, idx) => {
            return (
              <React.Fragment key={`${i.ingredientName}${idx}`}>
                <BasicBadge
                  color="#3093EF"
                  name={i.ingredientName}
                  icon={closeIcon}
                  onPress={() => {
                    removeIngredient(idx);
                  }}
                />
              </React.Fragment>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default HateIngredient;
