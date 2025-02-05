import { StackNavigationProp } from '@react-navigation/stack';
import Account from '../HeaderComponent/Account';


export type RootStackParamList = {
  index: undefined;
  forgotpassword: undefined;
  createaccount: undefined;
  otpvarification: undefined;
};

export type loginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'index'>;
export type forgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'forgotpassword'>;
export type CreateAccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'createaccount'>;
export type OtpVarificationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'otpvarification'>;