import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

/**
 * Generated class for the BlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ble',
  templateUrl: 'ble.html',
})
export class BlePage {
  devices: Array<{id: string, name: string}>;
  device_details: string;
  connected_device: string;
  characteristic_id: string;
  service_id: string;
  ble_data: string;
  // logForm() {
  //   console.log(this.todo)
  // }

  constructor(public navCtrl: NavController, public navParams: NavParams, private ble: BLE) {
    this.devices=[];
    //this.devices.push({name:"Will",id:"8459"});
  }

  scan () {
    this.devices = [];
    this.ble.enable();
    this.ble.startScan([]).subscribe(device => {
      if (typeof device.name !== 'undefined') {
        this.devices.push({ 'id': device.id, 'name': device.name });
      }             
    }, err => {
      alert('Scanning failed. Please try again.');
    });

    setTimeout(() => {
      this.ble.stopScan().then(() => { console.log('Finished scan'); })
      },5000);

  }

    //setTimeout(this.ble.stopScan() 2500);
    // , function(){
    //   alert('Finished scan');
    //     }, err => {
    //       alert('Failed to stop scan :x');
    //     }
    // );
  // }

  connect (device_id) {
    console.log("trying to connect to " + device_id)
    this.ble.connect(device_id).subscribe(res => {
        this.device_details = JSON.stringify(res);
        alert(JSON.stringify(res));
        this.connected_device=device_id;
        console.log("connection succesful")
      }, err => {
        console.log("connection NOT succesful")
        alert('Something went wrong while trying to connect. Please try again');
      }
    );
  }

  ble_disconnect() {
    this.ble.disconnect(this.connected_device).then(() => {
      console.log("disconnected from device");
    }, err => {
      alert("Error occured while trying to disconnect.");
    });
  }

  //Read a characteristic from a service
  ble_read () {
    console.log(this.service_id,this.characteristic_id)
    this.ble.read(this.connected_device, this.service_id, this.characteristic_id).then((response) => { 
        var data = new Uint8Array(response);
        console.log(String.fromCharCode.apply(null,data));
        alert(data);
      }, err => {
        alert("Error occured while trying to read BLE. Please try again.");
      }
    );
  }

  ble_write () {
    console.log(this.service_id,this.characteristic_id,this.stringToBytes(this.ble_data))
    this.ble.write(this.connected_device, this.service_id, this.characteristic_id,this.stringToBytes(this.ble_data)).then((response) => { 
        var data = new Uint8Array(response);
        console.log(data);
      }, err => {
        alert("Error occured while trying to write BLE. Please try again.");
      }
    );
  }

  // ASCII only
stringToBytes(string) {
  var array = new Uint8Array(string.length);
  for (var i = 0, l = string.length; i < l; i++) {
      array[i] = string.charCodeAt(i);
   }
   return array.buffer;
}

// ASCII only
bytesToString(buffer) {
   return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlePage');
  }

}
