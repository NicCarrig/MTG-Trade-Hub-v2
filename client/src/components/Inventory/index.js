import React from "react";

const Inventory = ({ inventory }) => {
    return (
        <div>
            {inventory && 
                inventory.map(cards => (
                    <div class="card-container">
                    <img src="{{img_uri}}" alt="image of {{card_name}}" />
                    {cards.card_name}
                    </div>
                ))}
        </div>
    );
};


export default Inventory;