import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity, FlatList} from 'react-native';

const App = () => {
  const [order, setOrder] = React.useState([]);
  const [tickets, setTickets] = React.useState();

  const addItemToOrder = item => {
    console.log('Item: ', item)
    const itemAlreadyPreset = order.find(i => item.id === i.id);
    const itemAlreadyPresetIndex = order.findIndex(i => item.id === i.id);
    console.log('Already Present: ', itemAlreadyPreset);
    if(itemAlreadyPreset){
      itemAlreadyPreset.time = itemAlreadyPreset.time + item.time;
      itemAlreadyPreset.qty++;
      const currentArr = [...order];
      currentArr.splice(itemAlreadyPresetIndex, 0, itemAlreadyPreset);
      setOrder(removeDuplicates(currentArr, 'id'));
    } else {
      let newItem = {id: item.id, time: item.time, qty: 1}
      setOrder([...order, newItem]);
    }
  }

  const addOrderToTicket = order => {
    setTickets([...tickets, order]);
  }

  function removeDuplicates(array, key) {
    return array.reduce((accumulator, element) => {
      if (!accumulator.find(el => el[key] === element[key])) {
        accumulator.push(element);
      }
      return accumulator;
    }, []);
  }

    const renderOrder = ({item}) => {
    return <View style={{flex: 1, marginBottom: 10, width: '100%', height: '10%', justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20}}>{`${item.id} - ${item.qty}x = ${item.time} secs`}</Text>
    </View>
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <View style={{flexDirection: 'row', width: '100%', height: '5%', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: '15%', height: '100%'}}></View>
          <View style={{width: '60%', height: '100%', justifyContent:'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20}}>Coffee Shop</Text>
          </View>
          <View style={{width: '15%', height: '100%', justifyContent:'center', alignItems: 'center'}}>
            <TouchableOpacity>
              <Text style={{fontSize: 12}}>Add Order</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{flex: 1, height: '100%', borderWidth: 1}}
          contentContainerStyle={{flex: 1, paddingHorizontal: 5, paddingTop: '5%', alignItems: 'center'}}>

          {/* Header */}
          <View style={{width: '80%', height: '5%', borderBottomWidth: 1 , alignItems: 'center', justifyContent: 'center', marginBottom: '2%'}}>
            <Text style={{fontSize: 30}}>Menu Items</Text>
          </View>

          {/* Menu Items */}
          <View style={{flexDirection: 'row', width: '100%', height: '15%', alignItems: 'center', justifyContent: 'space-around', marginBottom: '10%'}}>
            <TouchableOpacity style={{width: 120, height: 120, borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}
                              onPress={() => addItemToOrder({id: 'Cafe Au Lait', qty: 1, time: 4})}>
              <Text>{`Cafe Au Lait\n (4 sec.)`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width: 120, height: 120, borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}
                              onPress={() => addItemToOrder({id: 'Cappuccino', qty: 1, time: 10})}>
              <Text>{`Cappuccino\n (10 sec.)`}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width: 120, height: 120, borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}
                              onPress={() => addItemToOrder({id: 'Expresso', qty: 1, time: 15})}>
              <Text>{`Expresso\n (15 sec.)`}</Text>
            </TouchableOpacity>
          </View>

          {/* Current Order */}
          <View style={{width: '80%', height: '5%', borderBottomWidth: 1 , alignItems: 'center', justifyContent: 'center', marginBottom: '2%'}}>
            <Text style={{fontSize: 30}}>Current Order</Text>
          </View>

          {/* Order Items */}
          <View style={{ width: '100%', height: '20%', alignItems: 'center', borderWidth: 1}}>
            <FlatList
                data={order}
                renderItem={renderOrder}
                keyExtractor={item => item.id}
            />

          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
