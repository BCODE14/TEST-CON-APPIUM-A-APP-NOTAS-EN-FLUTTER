
//test-script elaborado por jackelin marca - app notas

import { remote } from 'webdriverio';
import { byValueKey,byText } from 'appium-flutter-finder';
import  assert  from 'node:assert';

const options = {
    port: 4723,
    hostname: '127.0.0.1',
    capabilities: {
        'appium:platformName': 'Android',
        'appium:automationName': 'Flutter',
        'appium:deviceName': '192.168.56.102:5555',
        'appium:app': 'C:\\Users\\JMARCA\\Documents\\practicante\\codigos\\pruappium\\app_habi.apk',
        "appium:noReset": true,
        "appium:appPackage": 'com.example.apnotas', 
        "appium:appActivity": 'com.example.apnotas.MainActivity',
        "appium:commandTimeout": 90000 
    }
};

(async () => {
    let client;
    let i=1;
    try {

        client = await remote(options);
        
        //verificar mensaje
        //const msjmodone = byText('Holi a la app de notas');
        const msjmodone = byValueKey('msjbien');
       // await client.pause(2000);
        const contmsjmodone = await client.getElementText(msjmodone);
       // console.log(contmsjmodone);
        assert.strictEqual(contmsjmodone,'Holi a la app de notas','msj iguales');

        //siguiente pantalla
        const btnSig = byValueKey('btnsignotas');
        await client.elementClick(btnSig);
        await client.execute('flutter:waitFor',btnSig,20000);    

        //await client.$(ultimo).waitForExist({ timeout: 5000 });
        
        //tomar captura
        await client.saveScreenshot("./capturas/pant"+i+"_"+ Date.now()+".png");

        //verificar mensaje
        const msjmod = byValueKey('nottite');
        const contmsjmod = await client.getElementText(msjmod);
        assert.strictEqual(contmsjmod,'crear nueva nota:','msj iguales');

        //selecionar opcion
        const seldor = byValueKey('catsel');
        await client.elementClick(seldor);

        const selopc = byText('estudio');
        await client.elementClick(selopc);

        //comparar op selecionada
        const valor = await client.getElementText(selopc);
        console.log('sel:',valor);

        //primera nota
        const textnota1 = byValueKey('msjnota');
        await client.elementSendKeys(textnota1, 'este es un mensaje de prueba');

        const btnaddnota1 = byValueKey('btnaddnota');
        await client.elementClick(btnaddnota1);

        //segunda nota
        const textnota2 = byValueKey('msjnota');
        await client.elementSendKeys(textnota2, 'este es un mensaje de prueba 2');

        const btnaddnota2 = byValueKey('btnaddnota');
        await client.elementClick(btnaddnota2);

        //elimina nota
        const btndel = byValueKey('btndel1');
        await client.elementClick(btndel);  
        await client.execute('flutter:waitFor',btndel,20000);  

        await client.saveScreenshot("./capturas/pant"+i+"_"+ Date.now()+".png");
        // await client.elementClear(text);

        

        console.log('✅ Sesión ejecutada correctamente con Appium + Flutter');
    } catch (err) {
        console.error('❌ Error al iniciar sesión:', err.message);
    } finally {
        if (client) {

            await client.terminateApp('com.example.apnotas');
            await client.deleteSession();
        }
        console.log('🔚 Sesión finalizada');
    }
})();
