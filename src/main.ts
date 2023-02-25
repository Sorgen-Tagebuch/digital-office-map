/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.area.onEnter('tecRoom').subscribe(() => {
        currentPopup = WA.ui.openPopup("tecPopup", "Warum möchtest du denn hier rein?", []);
    })

    WA.room.area.onEnter('roadSign').subscribe(() => {
        currentPopup = WA.ui.openPopup("roadPopup", "Rechts entlang, zum Sorgen-Tagebuch", []);
    })

    WA.room.area.onEnter('dangerZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("dangerPopup", "Was ist hier nur passiert?", []);
    })


    WA.room.area.onEnter('busStation').subscribe(() => {
        const today = new Date();
        const travelTime = new Date(today.getTime() + 60000)
        const time = travelTime.getHours() + ":" + travelTime.getMinutes();
        currentPopup = WA.ui.openPopup("busPopup", "Der nächste Bus kommt um "+time+" Uhr", []);
    })

    WA.room.area.onLeave('tecRoom').subscribe(closePopup)
    WA.room.area.onLeave('busStation').subscribe(closePopup)
    WA.room.area.onLeave('roadSign').subscribe(closePopup)
    WA.room.area.onLeave('dangerZone').subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
