import { StackNavigationProp } from '@react-navigation/stack';
import Account from '../HeaderComponent/Account';


export type RootStackParamList = {
  index: undefined;
  forgotpassword: undefined;
  createaccount: undefined;
  otpvarification: { from: 'forgotPassword' | 'login' };
  resetpassword: undefined;
  addProduct: undefined;
  AddShopDetails: undefined;  // Uncomment when you need this screen
  AddProductDetails:undefined;
  home: undefined;
  EditProduct: undefined;
};

export type loginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'index'>;
export type forgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'forgotpassword'>;
export type CreateAccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'createaccount'>;
export type OtpVarificationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'otpvarification'>;
export type ResetpasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'resetpassword'>;
export type addShopDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddShopDetails'>;
export type addProductDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddProductDetails'>;
export type homeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'home'>;
export type HomeDrowerScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'home'>;
export type editProductDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditProduct'>;
