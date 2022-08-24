import React from "react";

const Inventory = ({ inventory }) => {
    return (
        <div>
            {inventory && 
                inventory.map(cards => (
                    <div class="card-container">
                    <img src="{}" alt="image of {}" />
                    {cards.card_name}
                    </div>
                ))}
        </div>
    );
};


export default Inventory;