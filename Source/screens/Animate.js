import React, {Component} from 'react';
import ReactNative from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated
} = ReactNative;


var isHidden = true;

class Animate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val:'Pak',
      bounceValue: new Animated.Value(100),  //This is the initial position of the subview
      buttonText: "Show Subview"
    };
  }


  _toggleSubview() {    
    this.setState({
      buttonText: !isHidden ? "Show Subview" : "Hide Subview"
    });

    var toValue = 100;

    if(isHidden) {
      toValue = 0;
    }

    //This will animate the transalteY of the subview between 0 & 100 depending on its current state
    //100 comes from the style below, which is the height of the subview.
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 3,
        tension: 2,
        friction: 8,
      }
    ).start();

    isHidden = !isHidden;
  }

  render() {
    let data = [{label:'Kim',
      value: 'Aus',
    },{label:'Pak',
    value: 'Pak',
  },{label:'Ind',
  value: 'Ind',
}];
    return (
      <View style={styles.container}>
          <TouchableHighlight style={styles.button} onPress={()=> {this._toggleSubview()}}>
            <Text style={styles.buttonText}>{this.state.buttonText}</Text>
          </TouchableHighlight>
          <Animated.View
            style={[styles.subView,
              {transform: [{translateY: this.state.bounceValue}]}]}
          >
            <Text>This is a sub view</Text>
          </Animated.View>

<View style={{width:'80%',alignSelf:'center'}}>


<Dropdown
        onChangeText={(itemValue, itemIndex) =>
          this.setState({ val: itemValue })
        }
        labelFontSize={15}
        rippleOpacity={0.10}
        data={data}
        value={this.state.val}
        baseColor="#576574"
        
      />
</View>

      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 17,
    color: "#007AFF"
  },
  subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FF3",
    height: 100,
  }
});

export default Animate;