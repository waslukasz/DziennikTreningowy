import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View,Text, Button, TouchableOpacity } from "react-native";

const MenuScreen = ({ navigation }:{navigation:any}) => {
    return (<View style={{padding:10}}>

      <View style={{borderWidth:1, width:150, height:150, backgroundColor:"#fff", borderRadius:15, borderColor:"#cbcbcb"}}>
        <TouchableOpacity
          style={{width:150, height:150, display:"flex", justifyContent:"center", alignItems:"center", }}
          onPress={() => navigation.navigate('Training')} 
          >           
            <Text style={{fontSize:30}}>Trainings</Text>
          </TouchableOpacity>
      </View>
          </View>
    );
  };
  export default MenuScreen;