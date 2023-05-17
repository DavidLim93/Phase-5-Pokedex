import React from "react";
import Game from "./Game";

function Home ({user}) {

    

    return (
        <div>  
            <Game 
            user={user} 
            // user_id={user.id}
            />
        </div>
        
    )

}

export default Home;