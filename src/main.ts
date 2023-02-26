/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.chat.sendChatMessage('Willkommen im Sorgen-Tagebuch Büro! Es gibt verschiedene Bereiche - laufe auf Türen oder Treppen zu, um dich durch das Büro und die Straßen     zu bewegen.', 'Sorgen-Tagebuch Bot');

    // Request data from https://www.sorgen-tagebuch.de/api/get/statistics
    window.setTimeout(function(){
        fetch('https://www.sorgen-tagebuch.de/api/get/statistics')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // chose one of four options randomly
            var random = Math.floor(Math.random() * 6);
            var message = "";
            switch(random){
                case 0:
                    message = "Übrigens: Insgesamt wurden "+parseFloat(data['char_total']).toLocaleString('de-DE')+" Zeichen im Tagebuch geschrieben.";
                    break;
                case 1:
                    message = "Übrigens: Insgesamt wurden "+parseFloat(data['word_total']).toLocaleString('de-DE')+" Wörter im Tagebuch geschrieben.";
                    break;
                case 2:
                    message = "Übrigens: Aktuell habt der Sorgen-Tagebuch e.V. aktuell "+data['moderators_total']+" Tagebuchautor:innen.";
                    break;
                case 3:
                    message = "Übrigens: Aktuell wurden im Tagebuch "+parseFloat(data['entries_total']).toLocaleString('de-DE')+" Einträge geschrieben.";
                    break;
                case 4:
                    message = "Übrigens: Aktuell beträgt die durchschnittliche Bewertung durch Nutzer:innen "+parseFloat(data['feedbacks_avg']).toLocaleString('de-DE')+" Sterne.";
                    break;
                case 4:
                    message = "Übrigens: Aktuell beträgt die durchschnittliche Antwortzeit "+parseFloat(data['response_avg']).toLocaleString('de-DE')+" Stunden.";
                    break;
            }
            
            WA.chat.sendChatMessage(message, 'Sorgen-Tagebuch Bot');
        });
    }, 7000);

    // Car 1
    var carCounter = 0;
    var carMessages = ["Vorsicht, Auto!", "Pass doch auf!", "Dass passiert dir öfter, oder?", "Du wurdest schon vier mal beinahe überfahren!", "Das kann auf Dauer nicht gesund sein!", "Wir haben keine Krankenstation im digtialen Büro!", "Du hast offenbar sieben Leben.", "Vorsicht im Straßenverkehr!"];
    WA.room.area.onEnter('car1').subscribe(() => {
        if(carCounter > carMessages.length-1){
            carCounter = carMessages.length-1;
        }
        currentPopup = WA.ui.openPopup("car1Popup", carMessages[carCounter], []);
        carCounter++;
    })
    WA.room.area.onLeave('car1').subscribe(closePopup)

    // Car 2
    WA.room.area.onEnter('car2').subscribe(() => {
        if(carCounter > carMessages.length-1){
            carCounter = carMessages.length-1;
        }
        currentPopup = WA.ui.openPopup("car2Popup", carMessages[carCounter], []);
        carCounter++;
    })
    WA.room.area.onLeave('car2').subscribe(closePopup)

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
        const time = today.getHours()-1;
        currentPopup = WA.ui.openPopup("busPopup", "Der letzte Bus kam um "+time+" Uhr", []);
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
