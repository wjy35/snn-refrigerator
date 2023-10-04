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
      try {
        const res = await memberApi.memberHate(memberId);
        if (res.status === 200) {
          setIngredients(() => res.data.data.ingredient);
        }
      } catch (err) {
        console.log(err);
      }
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
    placeholder: '식재료 검색',
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

  //TODO: ingredient 등록이 되지 않음.

  function onSelectIngredient(item: any) {
    const execute = async () => {
      if (checkDuplicateIngredient(item)) {
        try {
          const res = await memberApi.addMemberHate(memberId, item.ingredientId);
          if (res.status === 200) {
            setIngredients([...ingredients, {...item}]);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    execute();
  }

  async function removeIngredient(idx: number) {
    try {
      const res = await memberApi.deleteMemberHate(memberId, idx);
      if (res.status !== 200) {
        const _ingredients = [...ingredients];
        _ingredients.splice(idx, 1);
        setIngredients(_ingredients);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }
  //TODO: onSelectIngredient가 작동을 하지 않음.
  return (
    <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <View style={{}}>
        <AutoCompleteInput
          {...excludeIngredient}
          textList={excludeIngredientList}
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
    </View>
  );
}

export default HateIngredient;
