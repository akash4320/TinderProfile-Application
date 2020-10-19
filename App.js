import React, { PureComponent } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Card, Text, Image, Button, ListItem } from 'react-native-elements';
import CardSwiper from 'react-native-card-swipe';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import UserDetailService from './components/UserDetailService'
import DummyDataService from './components/DummyDataService';
import conditionalRender from './components/conditionalRender';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      serverData: [],
      favorite: [],
      toggleFavorite: false,
      setFieldToShow: 'location'
    };

  }

  componentDidMount() {
    DummyDataService().
      then(response => {
        let tempFavorite = [...response.usersList];
        this.setState({ serverData: response.usersList });
        Promise.all(tempFavorite.map((user, index) => UserDetailService(user.id).then((response) => tempFavorite[index] = response.userDetails)))
          .then(() => this.setState({ serverData: tempFavorite }))
      })
      .catch(response => console.log(response.err));

  }

  renderCard=(item)=> {
    return (
      <View style={{ alignSelf: 'center' }}>
        <Card key={item.id}>
          <Card.Title>
            <Image
              source={{ uri: item.picture }}
              size="xlarge"
              style={{ width: 300, height: 300 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </Card.Title>
          <Text style={{ marginBottom: 5, height: 20, width: null }}>
            {`${item.title.charAt(0).toUpperCase() + item.title.slice(1)}.${item.firstName} ${item.lastName}`}
          </Text>
          <Text style={{ marginBottom: 10, height: 20, width: null }}>
            {`Email-ID:  ${item.email}`}
          </Text>
           {conditionalRender(item,this.state.setFieldToShow)} 
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: 200 }}>

            <TouchableOpacity onPress={() => { this.setState({setFieldToShow:'web'}) }} ><Icon2 name="globe-model" size={25} color="#900" /></TouchableOpacity>
            <TouchableOpacity onPress={() => { this.setState({setFieldToShow:'date'}) }}><Icon3 name="calendar-o" size={20} color="#900" /></TouchableOpacity>
            <TouchableOpacity onPress={() => { this.setState({setFieldToShow:'location'}) }}><Icon name="location" size={30} color="#900" /></TouchableOpacity>
            <TouchableOpacity onPress={() => { this.setState({setFieldToShow:'phone'}) }}><Icon3 name="mobile-phone" size={30} color="#900" /></TouchableOpacity>
            <TouchableOpacity onPress={() => { this.setState({setFieldToShow:'gender'}) }}><Icon name="lock" size={30} color="#900" /></TouchableOpacity>
          </View>

        </Card>
      </View>
    );
  }

  renderNoMoreCards() {
    return (
      <Card title="All done">
        <Text>There is no more content</Text>
      </Card>
    );
  }

  renderingFavoriteList(userList) {
    return (
      <Card containerStyle={{ padding: 0 }} >
        {
          userList.map((item, i) => {
            return (
              <ListItem
                key={item.id}
                roundAvatar
                title={`${item.firstName} ${item.lastName}`}
                leftAvatar={{ source: { uri: item.picture } }}
              />
            );
          })
        }
      </Card>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'flex-end', margin: 10 }}>
          <View style={{ width: 100 }}>
            {this.state.toggleFavorite ? <Button title="Users List" onPress={() => { this.setState(prevState => ({ toggleFavorite: !prevState.toggleFavorite })) }} /> :
              <Button title="Favorites" onPress={() => { this.setState(prevState => ({ toggleFavorite: !prevState.toggleFavorite })) }} />}
          </View>
        </View>
        <View style={{ flex: 9 }}>
          {!this.state.toggleFavorite ? <CardSwiper
            data={this.state.serverData}
            renderCard={this.renderCard}
            onSwipeLeft={() => this.setState({ setFieldToShow: 'location' })}
            onSwipeRight={item => this.setState(prevState => ({ favorite: [...prevState.favorite, item], setFieldToShow: 'location' }))}
            renderNoMoreCards={this.renderNoMoreCards}
          /> : this.renderingFavoriteList(this.state.favorite)}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

});
export default App;