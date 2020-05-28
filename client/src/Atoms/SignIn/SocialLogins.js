import React, {useState, useEffect, useContext} from "react"
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import FacebookLogin from "react-facebook-login"
import GoogleLogin from 'react-google-login';

import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";

import { UserContext } from "src/userContext";
import { NEW_USER } from "src/Services/GQL/NEW_USER"

export const LOGINEXTERNAL = gql`
mutation loginExternal(
        $email: String!,
        $id: String!
      ){
        loginExternal(email: $email, id: $id) {
            dataOut{
                success
                _id
                name
                email
                description
                picture
                token
                
                }
            errorOut{
                  name
                  message
                }
        }
      }
`;

export default function SocialLogins(){
    const classes = useStyles();
    const [extUser, setExtUser] = useState()
    const { context, setContext } = useContext(UserContext);
    const [loginExt, { loading, error, data }] = useMutation(LOGINEXTERNAL);
    const [newUser, newUserStates] = useMutation(NEW_USER);
    let history = useHistory();
    var GoogleV = 'https://res.cloudinary.com/party-images-app/image/upload/v1557462915/vgvduspc6s8j368y1ras.png'

//If I got fbc User, lets login and get all user data
    useEffect(() => {
      if(extUser){
        loginExt({
          variables: {
            email: extUser.email,
            id: extUser.id
          }
        });
      }

  }, [extUser])

  //After fbc aproval, login or make new user
    useEffect(() => {
        if(data && data.loginExternal && data.loginExternal.dataOut){
          if(data.loginExternal.dataOut.success === false){
            newUser({
            variables: {
              name:  extUser.name,
              email:  extUser.email,
              password: extUser.id,
              description: `Hi, I am ${extUser.name}`,
              picture: extUser.picture,
              type: "facebook account"
            }
          })
          }
          if(data.loginExternal.dataOut.success){
            window.localStorage.setItem("token", data.loginExternal.dataOut.token);
            setContext(prev => {
              return({
                ...prev,
                _id: data.loginExternal.dataOut._id,
                success: data.loginExternal.dataOut.success,
                name: data.loginExternal.dataOut.name,
                email: data.loginExternal.dataOut.email,
                picture: data.loginExternal.dataOut.picture,
                description: data.loginExternal.dataOut.description,
                token: data.loginExternal.dataOut.token
              })
            })
            // context.setUserToContext(data.loginExternal.dataOut)
          }
          
            console.log("DATA LoginExt: create new user!! ", data.loginExternal.dataOut.success)
            history.push("/")
        }
    }, [data && data.loginExternal])

  //Login after creating new user
  useEffect(() => {

    if(newUserStates && newUserStates.data && newUserStates.data.newUser && newUserStates.data.newUser.dataOut){
      if(newUserStates.data.newUser.dataOut.success){
        setContext(prev => {
          return({
            ...prev,
            _id: newUserStates.data.newUser.dataOut._id,
            success: newUserStates.data.newUser.dataOut.success,
            name: newUserStates.data.newUser.dataOut.name,
            email: newUserStates.data.newUser.dataOut.email,
            picture: newUserStates.data.newUser.dataOut.picture,
            description: newUserStates.data.newUser.dataOut.description,
            token: newUserStates.data.newUser.dataOut.token
          })
        })
      } 
    }

  }, [newUserStates && newUserStates.data])

    const responseExternal = (response, type) => {
        console.log("FB GG response ", type, response)

        switch(type) {
          case "fb":
            if(response.id){
              setExtUser({
                name: response.name,
                email: response.email,
                id: response.id,
                picture: response.picture.data.url
              })
            }
            break;
          case "gg":
            console.log("Google response: ", response.profileObj)
            if(response.profileObj && response.profileObj.googleId){
              setExtUser({
                email: response.profileObj.email,
                name: response.profileObj.name,
                picture: response.profileObj.imageUrl,
                id: response.profileObj.googleId})
            }
            break;
          default:
            // code block
        }
  }



    let fbContent;

        fbContent = (<Grid container className={classes.mainContainer}>
          <Grid item xs={12} className={classes.itemFacebook}>
            <Grid container justify="center">
              <Grid item>
                  <FacebookLogin
                        appId="601460357134288"
                        autoLoad={false}
                        fields="name,email,picture"
                        scope="public_profile,email"
                        size="metro"
                        redirectUri="https://www.charliehouseparty.club/"
                        disableMobileRedirect={true}
                        isMobile={true}
                        className={classes.buttonFacebook}
                        callback={(e) => responseExternal(e, "fb")}
                      />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.itemGoogle}>
            {/* <Grid container justify="center">
              <Grid item> */}
              <GoogleLogin
                    clientId="119981354324-7sj8o5l3dk03s56paf6d4fd0fbr9vuu6.apps.googleusercontent.com"
                    render={renderProps => (
                      <Button variant="contained" className={classes.googleBtn} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <Grid container alignItems="center" justify="center">
                          <Grid item>
                          <Grid container alignItems="center" alignContent="center" justify="center">
                            <Grid item>
                              <img className={classes.iconGoogle} src={GoogleV} />
                            </Grid>
                            <Grid item>
                              <p className={classes.googleBtnText}>Login with GOOGLE</p>
                            </Grid>
                          </Grid>
                          </Grid>
                        </Grid>
                      </Button>
                    )}
                    buttonText="Login"
                    onSuccess={(e) => responseExternal(e, "gg")}
                    onFailure={(e) => responseExternal(e, "gg")}
                    cookiePolicy={'single_host_origin'}
                  />
              {/* </Grid>
            </Grid> */}
          </Grid>
        </Grid>)

    return (
      <div>
      {fbContent}
      </div>
    );
}

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '100%',
    minHeight: 100,
  },
  iconGoogle: {
    height: 20,
    width: 20,
    marginRight: 10
  },
  googleBtn:{
    width: '100%',
  },
  googleBtnText:{
    marginTop: 3,
    marginBottom: 3
  },
  itemFacebook: {
    backgroundColor: '#4c69ba',
    marginTop: 10,
    marginBottom: 10,
  },
  itemGoogle: {
    marginBottom: 10
  },
  buttonFacebook: {
    width: '100%'
  }
}));