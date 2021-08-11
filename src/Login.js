import React from "react";
import fblogo from "./Facebook-logo.png";
export default class Login extends React.Component{
    constructor(props){
        super(props);
    }

		invokeLoginModal = () => {
			if(typeof(FB) != undefined	){
				/*global FB*/
				FB.login(function(response){
					console.log(response);
					const token = response.accessToken;
					localStorage.setItem('token',token);
					// add routes - public 
					// redirect to home page - private
				}, {
						scope: 'public_profile,email'
				});
			}
		}

    render(){
        return(
            <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                height: '100vh'
            }}>
                <div>
                    <h1>Please login to continue</h1>
                    <button onClick={this.invokeLoginModal}>
                        <img src={fblogo} style={{width:"150px",height:"90px"}}/>
                    </button>
                </div>
            </div>
            
        )
    }
}