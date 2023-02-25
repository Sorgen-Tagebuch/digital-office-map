/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.chat.sendChatMessage('Willkommen im Sorgen-Tagebuch Büro! Es gibt verschiedene Bereiche - laufe auf Türen oder Treppen zu, um dich durch das Büro und die Straßen     zu bewegen.', 'Sorgen-Tagebuch Bot');

    // Tec room
    WA.room.area.onEnter('tecRoom').subscribe(() => {
        currentPopup = WA.ui.openPopup("tecPopup", "Hier gibt es nichts zu sehen.", []);
    })
    WA.room.area.onLeave('tecRoom').subscribe(closePopup)

    // Market
    WA.room.area.onEnter('market').subscribe(() => {
        currentPopup = WA.ui.openPopup("marketPopup", "Gerade geschlossen.", []);
    })
    WA.room.area.onLeave('market').subscribe(closePopup)

    // Road
    WA.room.area.onEnter('roadSign').subscribe(() => {
        currentPopup = WA.ui.openPopup("roadPopup", "Zum Büro geht es rechts entlang, durch die linke Türe des Gebäudes.", []);
    })
    WA.room.area.onLeave('roadSign').subscribe(closePopup)

    // Water tower
    WA.room.area.onEnter('watertower').subscribe(() => {
        currentPopup = WA.ui.openPopup("towerPopup", "Betreten der Plattform verboten.", []);
    })
    WA.room.area.onLeave('watertower').subscribe(closePopup)

    // Danger zone
    WA.room.area.onEnter('dangerZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("dangerPopup", "Was ist hier nur passiert?", []);
    })
    WA.room.area.onLeave('dangerZone').subscribe(closePopup)

    // Bus station
    WA.room.area.onEnter('busStation').subscribe(() => {
        const today = new Date();
        const travelTime = new Date(today.getTime() + 60000)
        const time = travelTime.getHours() + ":" + 30*travelTime.getMinutes();
        currentPopup = WA.ui.openPopup("busPopup", "Der nächste Bus kommt um "+time+" Uhr", []);
    })
    WA.room.area.onLeave('busStation').subscribe(closePopup)


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
