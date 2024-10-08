/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Injectable, NgZone } from '@angular/core';
import { LoadingController, AlertController, ToastController, NavController, MenuController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { NavigationExtras, Router } from '@angular/router';
import { Servicio } from '../model/manicure-service.interface';
import { Post } from '../model/post.interface';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  isLoading = false;

  posts: Post[] = [
    {
      imagePath: 'assets/images/extras/complicatedDEN.jpg',
      serviceName: 'Manicure Deluxe',
      description: 'A luxurious manicure experience with the best products.'
    },
    {
      imagePath: 'assets/images/extras/simpleDEN.jpg',
      serviceName: 'Pedicure Spa',
      description: 'Relaxing pedicure with foot massage and exfoliation.'
    },
    {
      imagePath: 'assets/images/extras/cateye.jpeg',
      serviceName: 'Gel Polish',
      description: 'Long-lasting gel polish with a shiny finish.'
    },
  ];

  offers: any[] = [
    {
      "title": "First-time client special",
      "desc": "These tags can be used to highlight special promotions or deals to attract customers and increase sales in a salon setting",
      "off": "20",
    },
    {
      "title": "Loyalty program",
      "desc": "These tags can be used to highlight special promotions or deals to attract customers and increase sales in a salon setting",
      "off": "30",
    },
    {
      "title": "Refer-a-friend discount",
      "desc": "These tags can be used to highlight special promotions or deals to attract customers and increase sales in a salon setting",
      "off": "10",
    },
    {
      "title": "Summer hair package",
      "desc": "These tags can be used to highlight special promotions or deals to attract customers and increase sales in a salon setting",
      "off": "40",
    },
    {
      "title": "Group booking deal",
      "desc": "These tags can be used to highlight special promotions or deals to attract customers and increase sales in a salon setting",
      "off": "50",
    },
    {
      "title": "Special occasion package",
      "desc": "These tags can be used to highlight special promotions or deals to attract customers and increase sales in a salon setting",
      "off": "60",
    },
    {
      "title": "Seasonal hair color promotion",
      "desc": "These tags can be used to highlight special promotions or deals to attract customers and increase sales in a salon setting",
      "off": "65",
    },
  ];

  categories: any[] = [
    {
      "name": "manicures",
      "image": "assets/images/category/9.png"
    },
    {
      "name": "pedicures",
      "image": "assets/images/category/10.png"
    }
  ];

  salonList: any[] = [
    {
      "id" : 1,
      "name": "Russian Manicure",
      "description": "3788 Chapel Street Sugar Land",
      "cover": "assets/images/avatar/manRuso.jpeg",
      "price": "42",
      "distance": "1.2 KM"
    },
    {
      "id" : 2,
      "name": "Dual Forms",
      "description": "3104 Public Works Drive Chattanooga",
      "cover": "assets/images/avatar/dualForm.jpeg",
      "price": "46",
      "distance": "1.2 KM"
    },
    {
      "id" : 3,
      "name": "Russian Peddicure",
      "description": "864 Lucy Lane Evansville",
      "cover": "assets/images/avatar/pedicureRuso.jpg",
      "price": "50",
      "distance": "1.2 KM"
    }
  ];

//  [
//    {
//      "name": "An Extra Color",
//      "description": "An Extra Color",
//      "cover": "assets/images/salon-cover/1.png",
//      "price": 10.00
//    },
//    {
//      "name": "French Tip Design",
//      "description": "French Tip Design",
//      "cover": "assets/images/salon-cover/1.png",
//      "price": 15.00
//    },
//    {
//      "name": "Double French Tip",
//      "description": "Double French Tip",
//      "cover": "assets/images/salon-cover/1.png",
//      "price": 20.00
//    },
//    {
//      "name": "Repair( 1 Nail )",
//      "description": "Repair( 1 Nail )",
//      "cover": "assets/images/salon-cover/1.png",
//      "price": 10.00
//    },
//    {
//      "name": "Repair( 2 Nail )",
//      "description": "Repair( 2 Nail )",
//      "cover": "assets/images/salon-cover/1.png",
//      "price": 20.00
//    },
//    {
//      "name": "Repair( All Nails ) Reinforce All Nails with Polygel",
//      "description": "Repair( All Nails ) Reinforce All Nails with Polygel",
//      "cover": "assets/images/salon-cover/1.png",
//      "price": 30.00
//    },
//    {
//      "name": "Change in the Shape of Nail",
//      "description": "Change in the Shape of Nail",
//      "cover": "assets/images/salon-cover/1.png",
//      "price": 10.00
//    },
//    {
//      "name": "Nail Art Design, Easy Pattern on Each Nail",
//      "description": "Nail Art Design, Easy Pattern on Each Nail",
//      "cover": "assets/images/salon-cover/1.png",
//      "price": 30.00
//    },
//    {
//      "name": "Nail Art Design, Complicated Pattern on Each Nail",
//      "description": "Nail Art Design, Complicated Pattern on Each Nail",
//      "cover": "assets/images/salon-cover/1.png",
//      "price": 50.00
//    },
//    {
//      "name": "Simple Design( 1 Nail Designed )",
//      "description": "Simple Design( 1 Nail Designed )",
//      "cover": "assets/images/salon-cover/1.png",
//      "price": 10.00
//    },
//    {
//      "name": "Chrome",
//      "description": "Chrome",
//      "cover": "assets/images/salon-cover/1.png",
//      "price": 20.00
//    },
//    {
//      "name": "Ombré Design",
//      "description": "Ombré Design",
//      "cover": "assets/images/salon-cover/1.png",
//      "price": 25.00
//    },
//    {
//      "name": "Cat Eye( Magnet Gel )",
//      "description": "Cat Eye( Magnet Gel )",
//      "cover": "assets/images/salon-cover/1.png",
//      "price": 10.00
//    },
//    {
//      "name": "Acrylic Removal",
//      "description": "Acrylic Removal",
//      "cover": "assets/images/salon-cover/1.png",
//      "price": 40.00
//    },
//    {
//      "name": "Gel Removal",
//      "description": "Gel Removal",
//      "cover": "assets/images/salon-cover/1.png",
//      "price": 25.00
//    }
//  ]

//[
//  {
//    "name": "SHORT NAIL REAPPLICATION",
//    "description": "No Design | Base Color | Hard Gel/PolyGel",
//    "imagePath": "assets/images/salon-cover/1.png",
//    "price": 110.00,
//    "note": "",
//    "type": "MANICURE",
//    "variants": [
//      {
//        "id": "fbf7e578-0cd1-4912-967a-f1af3691cde4"
//      },
//      {
//        "id": "1db375e3-95ce-4439-abff-6507af4f0bbc"
//      },
//      {
//        "id": "73a3580c-ed3d-4b03-a830-04b5620ca48b"
//      },
//      {
//        "id": "f5f2d9e0-8db8-4520-9c75-fe4c9008f599"
//      },
//      {
//        "id": "f9e966cf-5bd4-4d3b-aac4-3a67de2e75ab"
//      },
//      {
//        "id": "3a50a784-96a4-446f-b00d-3d118ccdc682"
//      },
//      {
//        "id": "f8bbcf77-a956-4206-83bc-18144b5af854"
//      },
//      {
//        "id": "9b30415e-2a16-44d5-b5c3-b7a4c9a27af1"
//      },
//      {
//        "id": "61b2337a-a9e2-477d-acb9-3c9138518db6"
//      },
//      {
//        "id": "f2f8dd86-ede0-4a54-a9bf-8a6a9c9acc8c"
//      },
//      {
//        "id": "2c4e9f66-95cc-4a65-92e0-955142c22eb8"
//      },
//      {
//        "id": "c08d473b-d7d2-4220-8ed8-8d3dcd9da46a"
//      },
//      {
//        "id": "84821dee-a170-429e-973b-cf61358f4c9f"
//      },
//      {
//        "id": "89e79959-7ea9-4e89-9dd2-56b277ef3872"
//      },
//      {
//        "id": "e0e6d533-f638-41f7-b70f-e8c29ec4cbe6"
//      }
//    ]
//  },
//  {
//    "name": "MEDIUM NAIL REAPPLICATION",
//    "description": "No Design | Base Color | Hard Gel/PolyGel",
//    "imagePath": "assets/images/salon-cover/1.png",
//    "price": 120.00,
//    "note": "",
//    "type": "MANICURE",
//    "variants": [
//      {
//        "id": "fbf7e578-0cd1-4912-967a-f1af3691cde4"
//      },
//      {
//        "id": "1db375e3-95ce-4439-abff-6507af4f0bbc"
//      },
//      {
//        "id": "73a3580c-ed3d-4b03-a830-04b5620ca48b"
//      },
//      {
//        "id": "f5f2d9e0-8db8-4520-9c75-fe4c9008f599"
//      },
//      {
//        "id": "f9e966cf-5bd4-4d3b-aac4-3a67de2e75ab"
//      },
//      {
//        "id": "3a50a784-96a4-446f-b00d-3d118ccdc682"
//      },
//      {
//        "id": "f8bbcf77-a956-4206-83bc-18144b5af854"
//      },
//      {
//        "id": "9b30415e-2a16-44d5-b5c3-b7a4c9a27af1"
//      },
//      {
//        "id": "61b2337a-a9e2-477d-acb9-3c9138518db6"
//      },
//      {
//        "id": "f2f8dd86-ede0-4a54-a9bf-8a6a9c9acc8c"
//      },
//      {
//        "id": "2c4e9f66-95cc-4a65-92e0-955142c22eb8"
//      },
//      {
//        "id": "c08d473b-d7d2-4220-8ed8-8d3dcd9da46a"
//      },
//      {
//        "id": "84821dee-a170-429e-973b-cf61358f4c9f"
//      },
//      {
//        "id": "89e79959-7ea9-4e89-9dd2-56b277ef3872"
//      },
//      {
//        "id": "e0e6d533-f638-41f7-b70f-e8c29ec4cbe6"
//      }
//    ]
//  },
//  {
//    "name": "LONG NAIL REAPPLICATION",
//    "description": "No Design | Base Color | Hard Gel/PolyGel",
//    "imagePath": "assets/images/salon-cover/1.png",
//    "price": 170.00,
//    "note": "",
//    "type": "MANICURE",
//    "variants": [
//      {
//        "id": "fbf7e578-0cd1-4912-967a-f1af3691cde4"
//      },
//      {
//        "id": "1db375e3-95ce-4439-abff-6507af4f0bbc"
//      },
//      {
//        "id": "73a3580c-ed3d-4b03-a830-04b5620ca48b"
//      },
//      {
//        "id": "f5f2d9e0-8db8-4520-9c75-fe4c9008f599"
//      },
//      {
//        "id": "f9e966cf-5bd4-4d3b-aac4-3a67de2e75ab"
//      },
//      {
//        "id": "3a50a784-96a4-446f-b00d-3d118ccdc682"
//      },
//      {
//        "id": "f8bbcf77-a956-4206-83bc-18144b5af854"
//      },
//      {
//        "id": "9b30415e-2a16-44d5-b5c3-b7a4c9a27af1"
//      },
//      {
//        "id": "61b2337a-a9e2-477d-acb9-3c9138518db6"
//      },
//      {
//        "id": "f2f8dd86-ede0-4a54-a9bf-8a6a9c9acc8c"
//      },
//      {
//        "id": "2c4e9f66-95cc-4a65-92e0-955142c22eb8"
//      },
//      {
//        "id": "c08d473b-d7d2-4220-8ed8-8d3dcd9da46a"
//      },
//      {
//        "id": "84821dee-a170-429e-973b-cf61358f4c9f"
//      },
//      {
//        "id": "89e79959-7ea9-4e89-9dd2-56b277ef3872"
//      },
//      {
//        "id": "e0e6d533-f638-41f7-b70f-e8c29ec4cbe6"
//      }
//    ]
//  },
//  {
//    "name": "SHORT/MEDIUM NAIL | SOFT GEL(RUBBER BASE)",
//    "description": "No Design | Base Color",
//    "imagePath": "assets/images/salon-cover/1.png",
//    "price": 100.00,
//    "note": "*Recommended for strong and normal nails",
//    "type": "MANICURE",
//    "variants": [
//      {
//        "id": "fbf7e578-0cd1-4912-967a-f1af3691cde4"
//      },
//      {
//        "id": "1db375e3-95ce-4439-abff-6507af4f0bbc"
//      },
//      {
//        "id": "73a3580c-ed3d-4b03-a830-04b5620ca48b"
//      },
//      {
//        "id": "f5f2d9e0-8db8-4520-9c75-fe4c9008f599"
//      },
//      {
//        "id": "f9e966cf-5bd4-4d3b-aac4-3a67de2e75ab"
//      },
//      {
//        "id": "3a50a784-96a4-446f-b00d-3d118ccdc682"
//      },
//      {
//        "id": "f8bbcf77-a956-4206-83bc-18144b5af854"
//      },
//      {
//        "id": "9b30415e-2a16-44d5-b5c3-b7a4c9a27af1"
//      },
//      {
//        "id": "61b2337a-a9e2-477d-acb9-3c9138518db6"
//      },
//      {
//        "id": "f2f8dd86-ede0-4a54-a9bf-8a6a9c9acc8c"
//      },
//      {
//        "id": "2c4e9f66-95cc-4a65-92e0-955142c22eb8"
//      },
//      {
//        "id": "c08d473b-d7d2-4220-8ed8-8d3dcd9da46a"
//      },
//      {
//        "id": "84821dee-a170-429e-973b-cf61358f4c9f"
//      },
//      {
//        "id": "89e79959-7ea9-4e89-9dd2-56b277ef3872"
//      },
//      {
//        "id": "e0e6d533-f638-41f7-b70f-e8c29ec4cbe6"
//      }
//    ]
//  },
//  {
//    "name": "SHORT NAIL | FULL SET",
//    "description": "No Design | Base Color | Hard Gel/PolyGel",
//    "imagePath": "assets/images/salon-cover/1.png",
//    "price": 140.00,
//    "note": "*Add design service(additional price)",
//    "type": "MANICURE",
//    "variants": [
//      {
//        "id": "fbf7e578-0cd1-4912-967a-f1af3691cde4"
//      },
//      {
//        "id": "1db375e3-95ce-4439-abff-6507af4f0bbc"
//      },
//      {
//        "id": "73a3580c-ed3d-4b03-a830-04b5620ca48b"
//      },
//      {
//        "id": "f5f2d9e0-8db8-4520-9c75-fe4c9008f599"
//      },
//      {
//        "id": "f9e966cf-5bd4-4d3b-aac4-3a67de2e75ab"
//      },
//      {
//        "id": "3a50a784-96a4-446f-b00d-3d118ccdc682"
//      },
//      {
//        "id": "f8bbcf77-a956-4206-83bc-18144b5af854"
//      },
//      {
//        "id": "9b30415e-2a16-44d5-b5c3-b7a4c9a27af1"
//      },
//      {
//        "id": "61b2337a-a9e2-477d-acb9-3c9138518db6"
//      },
//      {
//        "id": "f2f8dd86-ede0-4a54-a9bf-8a6a9c9acc8c"
//      },
//      {
//        "id": "2c4e9f66-95cc-4a65-92e0-955142c22eb8"
//      },
//      {
//        "id": "c08d473b-d7d2-4220-8ed8-8d3dcd9da46a"
//      },
//      {
//        "id": "84821dee-a170-429e-973b-cf61358f4c9f"
//      },
//      {
//        "id": "89e79959-7ea9-4e89-9dd2-56b277ef3872"
//      },
//      {
//        "id": "e0e6d533-f638-41f7-b70f-e8c29ec4cbe6"
//      }
//    ]
//  },
//  {
//    "name": "MEDIUM NAIL | FULL SET",
//    "description": "No Design | Base Color | Hard Gel/PolyGel",
//    "imagePath": "assets/images/salon-cover/1.png",
//    "price": 150.00,
//    "note": "*Add design service(additional price)",
//    "type": "MANICURE",
//    "variants": [
//      {
//        "id": "fbf7e578-0cd1-4912-967a-f1af3691cde4"
//      },
//      {
//        "id": "1db375e3-95ce-4439-abff-6507af4f0bbc"
//      },
//      {
//        "id": "73a3580c-ed3d-4b03-a830-04b5620ca48b"
//      },
//      {
//        "id": "f5f2d9e0-8db8-4520-9c75-fe4c9008f599"
//      },
//      {
//        "id": "f9e966cf-5bd4-4d3b-aac4-3a67de2e75ab"
//      },
//      {
//        "id": "3a50a784-96a4-446f-b00d-3d118ccdc682"
//      },
//      {
//        "id": "f8bbcf77-a956-4206-83bc-18144b5af854"
//      },
//      {
//        "id": "9b30415e-2a16-44d5-b5c3-b7a4c9a27af1"
//      },
//      {
//        "id": "61b2337a-a9e2-477d-acb9-3c9138518db6"
//      },
//      {
//        "id": "f2f8dd86-ede0-4a54-a9bf-8a6a9c9acc8c"
//      },
//      {
//        "id": "2c4e9f66-95cc-4a65-92e0-955142c22eb8"
//      },
//      {
//        "id": "c08d473b-d7d2-4220-8ed8-8d3dcd9da46a"
//      },
//      {
//        "id": "84821dee-a170-429e-973b-cf61358f4c9f"
//      },
//      {
//        "id": "89e79959-7ea9-4e89-9dd2-56b277ef3872"
//      },
//      {
//        "id": "e0e6d533-f638-41f7-b70f-e8c29ec4cbe6"
//      }
//    ]
//  },
//  {
//    "name": "LONG NAIL | FULL SET",
//    "description": "No Design | Base Color | Hard Gel/PolyGel",
//    "imagePath": "assets/images/salon-cover/1.png",
//    "price": 200.00,
//    "note": "*Add design service(additional price)",
//    "type": "MANICURE",
//    "variants": [
//      {
//        "id": "fbf7e578-0cd1-4912-967a-f1af3691cde4"
//      },
//      {
//        "id": "1db375e3-95ce-4439-abff-6507af4f0bbc"
//      },
//      {
//        "id": "73a3580c-ed3d-4b03-a830-04b5620ca48b"
//      },
//      {
//        "id": "f5f2d9e0-8db8-4520-9c75-fe4c9008f599"
//      },
//      {
//        "id": "f9e966cf-5bd4-4d3b-aac4-3a67de2e75ab"
//      },
//      {
//        "id": "3a50a784-96a4-446f-b00d-3d118ccdc682"
//      },
//      {
//        "id": "f8bbcf77-a956-4206-83bc-18144b5af854"
//      },
//      {
//        "id": "9b30415e-2a16-44d5-b5c3-b7a4c9a27af1"
//      },
//      {
//        "id": "61b2337a-a9e2-477d-acb9-3c9138518db6"
//      },
//      {
//        "id": "f2f8dd86-ede0-4a54-a9bf-8a6a9c9acc8c"
//      },
//      {
//        "id": "2c4e9f66-95cc-4a65-92e0-955142c22eb8"
//      },
//      {
//        "id": "c08d473b-d7d2-4220-8ed8-8d3dcd9da46a"
//      },
//      {
//        "id": "84821dee-a170-429e-973b-cf61358f4c9f"
//      },
//      {
//        "id": "89e79959-7ea9-4e89-9dd2-56b277ef3872"
//      },
//      {
//        "id": "e0e6d533-f638-41f7-b70f-e8c29ec4cbe6"
//      }
//    ]
//  }
//]

 // manicureList: Servicio[] = [
 //   {
 //     "name": "SHORT NAIL REAPPLICATION",
 //     "description": "No Design | Base Color | Hard Gel/PolyGel",
 //     "cover": "assets/images/salon-cover/1.png",
 //     "price": 110.00,
 //     "note" : "",

 //     extrasList: [
 //       {
 //         "name": "An Extra Color",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "French Tip Design",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 15.00,
 //       },
 //       {
 //         "name": "Double French Tip",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Repair( 1 Nail )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Repair( 2 Nail )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Repair( All Nails ) Reinforce All Nails with Polygel",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 30.00,
 //       },
 //       {
 //         "name": "Change in the Shape of Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Nail Art Design, Easy Pattern on Each Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 30.00,
 //       },
 //       {
 //         "name": "Nail Art Design, Complicated Pattern on Each Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 50.00,
 //       },
 //       {
 //         "name": "Simple Design( 1 Nail Designed )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Chrome",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Ombré Design",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 25.00,
 //       },
 //       {
 //         "name": "Cat Eye( Magnet Gel )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Acrylic Removal",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 40.00,
 //       },
 //       {
 //         "name": "Gel Removal",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 25.00,
 //       },
 //     ]
 //   },
 //   {
 //     "name": "MEDIUM NAIL REAPPLICATION",
 //     "description": "No Design | Base Color | Hard Gel/PolyGel",
 //     "cover": "assets/images/salon-cover/1.png",
 //     "price": 120.00,
 //     "note" : "",
 //     extrasList: [
 //       {
 //         "name": "An Extra Color",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "French Tip Design",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 15.00,
 //       },
 //       {
 //         "name": "Double French Tip",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Repair( 1 Nail )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Repair( 2 Nail )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Repair( All Nails ) Reinforce All Nails with Polygel",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 30.00,
 //       },
 //       {
 //         "name": "Change in the Shape of Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Nail Art Design, Easy Pattern on Each Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 30.00,
 //       },
 //       {
 //         "name": "Nail Art Design, Complicated Pattern on Each Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 50.00,
 //       },
 //       {
 //         "name": "Simple Design( 1 Nail Designed )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Chrome",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Ombré Design",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 25.00,
 //       },
 //       {
 //         "name": "Cat Eye( Magnet Gel )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 25.00,
 //       },
 //       {
 //         "name": "Acrylic Removal",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 40.00,
 //       },
 //       {
 //         "name": "Gel Removal",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 25.00,
 //       },
 //     ]
 //   },
 //   {
 //     "name": "LONG NAIL REAPPLICATION",
 //     "description": "No Design | Base Color | Hard Gel/PolyGel",
 //     "cover": "assets/images/salon-cover/1.png",
 //     "price": 170.00,
 //     "note" : "",
 //     extrasList: [
 //       {
 //         "name": "An Extra Color",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "French Tip Design",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 15.00,
 //       },
 //       {
 //         "name": "Double French Tip",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Repair( 1 Nail )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Repair( 2 Nail )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Repair( All Nails ) Reinforce All Nails with Polygel",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 30.00,
 //       },
 //       {
 //         "name": "Change in the Shape of Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Nail Art Design, Easy Pattern on Each Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 30.00,
 //       },
 //       {
 //         "name": "Nail Art Design, Complicated Pattern on Each Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 50.00,
 //       },
 //       {
 //         "name": "Simple Design( 1 Nail Designed )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Chrome",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Ombré Design",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 25.00,
 //       },
 //       {
 //         "name": "Cat Eye( Magnet Gel )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 25.00,
 //       },
 //       {
 //         "name": "Acrylic Removal",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 40.00,
 //       },
 //       {
 //         "name": "Gel Removal",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 25.00,
 //       },
 //     ]
 //   },
 //   {
 //     "name": "SHORT/MEDIUM NAIL | SOFT GEL(RUBBER BASE)",
 //     "description": "No Design | Base Color",
 //     "cover": "assets/images/salon-cover/1.png",
 //     "price": 100.00,
 //     "note" : "*Recommended for strong and normal nails",
 //     extrasList: [
 //       {
 //         "name": "An Extra Color",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "French Tip Design",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 15.00,
 //       },
 //       {
 //         "name": "Double French Tip",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Repair( 1 Nail )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Repair( 2 Nail )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Repair( All Nails ) Reinforce All Nails with Polygel",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 30.00,
 //       },
 //       {
 //         "name": "Change in the Shape of Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Nail Art Design, Easy Pattern on Each Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 30.00,
 //       },
 //       {
 //         "name": "Nail Art Design, Complicated Pattern on Each Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 50.00,
 //       },
 //       {
 //         "name": "Simple Design( 1 Nail Designed )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Chrome",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Ombré Design",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 25.00,
 //       },
 //       {
 //         "name": "Cat Eye( Magnet Gel )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 25.00,
 //       },
 //       {
 //         "name": "Acrylic Removal",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 40.00,
 //       },
 //       {
 //         "name": "Gel Removal",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 25.00,
 //       },
 //     ]
 //   },
 //   {
 //     "name": "SHORT NAIL | FULL SET",
 //     "description": "No Design | Base Color | Hard Gel/PolyGel",
 //     "cover": "assets/images/salon-cover/1.png",
 //     "price": 140.00,
 //     "note" : "*Add design service(additional price)",
 //     extrasList: [
 //       {
 //         "name": "An Extra Color",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "French Tip Design",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 15.00,
 //       },
 //       {
 //         "name": "Double French Tip",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Repair( 1 Nail )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Repair( 2 Nail )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Repair( All Nails ) Reinforce All Nails with Polygel",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 30.00,
 //       },
 //       {
 //         "name": "Change in the Shape of Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Nail Art Design, Easy Pattern on Each Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 30.00,
 //       },
 //       {
 //         "name": "Nail Art Design, Complicated Pattern on Each Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 50.00,
 //       },
 //       {
 //         "name": "Simple Design( 1 Nail Designed )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Chrome",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Ombré Design",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 25.00,
 //       },
 //       {
 //         "name": "Cat Eye( Magnet Gel )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 25.00,
 //       },
 //       {
 //         "name": "Acrylic Removal",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 40.00,
 //       },
 //       {
 //         "name": "Gel Removal",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 25.00,
 //       },
 //     ]
 //   },
 //   {
 //     "name": "MEDIUM NAIL | FULL SET",
 //     "description": "No Design | Base Color | Hard Gel/PolyGel",
 //     "cover": "assets/images/salon-cover/1.png",
 //     "price": 150.00,
 //     "note" : "*Add design service(additional price)",
 //     extrasList: [
 //       {
 //         "name": "An Extra Color",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "French Tip Design",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 15.00,
 //       },
 //       {
 //         "name": "Double French Tip",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Change in the Shape of Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Nail Art Design, Easy Pattern on Each Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 30.00,
 //       },
 //       {
 //         "name": "Nail Art Design, Complicated Pattern on Each Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 50.00,
 //       },
 //       {
 //         "name": "Simple Design( 1 Nail Designed )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Chrome",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Ombré Design",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 25.00,
 //       },
 //       {
 //         "name": "Cat Eye( Magnet Gel )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Acrylic Removal",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 40.00,
 //       },
 //       {
 //         "name": "Gel Removal",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 25.00,
 //       },
 //     ]
 //   },
 //   {
 //     "name": "LONG NAIL | FULL SET",
 //     "description": "No Design | Base Color | Hard Gel/PolyGel",
 //     "cover": "assets/images/salon-cover/1.png",
 //     "price": 200.00,
 //     "note" : "*Add design service(additional price)",
 //     extrasList: [
 //       {
 //         "name": "An Extra Color",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "French Tip Design",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 15.00,
 //       },
 //       {
 //         "name": "Double French Tip",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Change in the Shape of Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Nail Art Design, Easy Pattern on Each Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 30.00,
 //       },
 //       {
 //         "name": "Nail Art Design, Complicated Pattern on Each Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 50.00,
 //       },
 //       {
 //         "name": "Simple Design( 1 Nail Designed )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Chrome",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 20.00,
 //       },
 //       {
 //         "name": "Ombré Design",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 25.00,
 //       },
 //       {
 //         "name": "Cat Eye( Magnet Gel )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 10.00,
 //       },
 //       {
 //         "name": "Acrylic Removal",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 40.00,
 //       },
 //       {
 //         "name": "Gel Removal",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": 25.00,
 //       },
 //     ]
 //   },
 // ];
//
 // pedicureList: Servicio[] = [
 //   {
 //     "name": "POLISH E-FILE",
 //     "description": "Dry Pedicure | Gel Color",
 //     "cover": "assets/images/salon-cover/1.png",
 //     "price": "$100.00",
 //     "note" : "",
 //     extrasList: [
 //       {
 //         "name": "French Tip Design",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$15.00",
 //       },
 //       {
 //         "name": "Double French Tip",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$20.00",
 //       },
 //       {
 //         "name": "Repair( 1 Nail )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$10.00",
 //       },
 //       {
 //         "name": "Repair( 2 Nail )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$20.00",
 //       },
 //       {
 //         "name": "Nail Art Design, Easy Pattern on Each Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$30.00",
 //       },
 //       {
 //         "name": "Nail Art Design, Complicated Pattern on Each Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$50.00",
 //       },
 //       {
 //         "name": "Simple Design( 1 Nail Designed )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$10.00",
 //       },
 //       {
 //         "name": "Chrome",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$20.00",
 //       },
 //       {
 //         "name": "Ombré Design",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$25.00",
 //       },
 //       {
 //         "name": "Cat Eye( Magnet Gel )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$10.00",
 //       },
 //       {
 //         "name": "Acrylic Removal",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$40.00",
 //       },
 //       {
 //         "name": "Gel Removal",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$25.00",
 //       },
 //     ]
 //   },
 //   {
 //     "name": "FRENCH E-FILE",
 //     "description": "Dry Pedicure | Gel Color",
 //     "cover": "assets/images/salon-cover/1.png",
 //     "price": "$115.00",
 //     "note" : "",
 //     extrasList: [
 //       {
 //         "name": "French Tip Design",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$15.00",
 //       },
 //       {
 //         "name": "Double French Tip",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$20.00",
 //       },
 //       {
 //         "name": "Repair( 1 Nail )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$10.00",
 //       },
 //       {
 //         "name": "Repair( 2 Nail )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$20.00",
 //       },
 //       {
 //         "name": "Nail Art Design, Easy Pattern on Each Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$30.00",
 //       },
 //       {
 //         "name": "Nail Art Design, Complicated Pattern on Each Nail",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$50.00",
 //       },
 //       {
 //         "name": "Simple Design( 1 Nail Designed )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$10.00",
 //       },
 //       {
 //         "name": "Chrome",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$20.00",
 //       },
 //       {
 //         "name": "Ombré Design",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$25.00",
 //       },
 //       {
 //         "name": "Cat Eye( Magnet Gel )",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$10.00",
 //       },
 //       {
 //         "name": "Acrylic Removal",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$40.00",
 //       },
 //       {
 //         "name": "Gel Removal",
 //         "cover": "assets/images/salon-cover/1.png",
 //         "price": "$25.00",
 //       },
 //     ]
 //   },
 // ];


  userList: any[] = [
    {
      "image": "assets/images/avatar/1.jpg",
      "name": "Richard G. Oneal"
    },
    {
      "image": "assets/images/avatar/2.jpg",
      "name": "Floyd M. Helton"
    },
    {
      "image": "assets/images/avatar/3.jpg",
      "name": "Matthew M. Hernandez"
    },
    {
      "image": "assets/images/avatar/4.jpg",
      "name": "Candice M. Coffey"
    },
    {
      "image": "assets/images/avatar/5.jpg",
      "name": "Terrie R. Cobb"
    },
    {
      "image": "assets/images/avatar/6.jpg",
      "name": "Clarissa C. Wentz"
    },
    {
      "image": "assets/images/avatar/7.jpg",
      "name": "Shirley J. Arnold"
    },
    {
      "image": "assets/images/avatar/8.jpg",
      "name": "Jack R. Applegate"
    },
    {
      "image": "assets/images/avatar/9.jpg",
      "name": "Anita T. Ross"
    },
    {
      "image": "assets/images/avatar/10.jpg",
      "name": "Dianna K. Wadley"
    },
    {
      "image": "assets/images/avatar/11.jpg",
      "name": "Rodney R. Ruddy"
    },
    {
      "image": "assets/images/avatar/12.jpg",
      "name": "Deanna B. Mull"
    },
    {
      "image": "assets/images/avatar/13.jpg",
      "name": "Michael C. Phelan"
    },
    {
      "image": "assets/images/avatar/14.jpg",
      "name": "Lorraine S. Jones"
    },
    {
      "image": "assets/images/avatar/15.jpg",
      "name": "Philip J. Watson"
    },
    {
      "image": "assets/images/avatar/16.jpg",
      "name": "Patricia R. James"
    },
    {
      "image": "assets/images/avatar/17.jpg",
      "name": "Dena C. Fernandez"
    },
    {
      "image": "assets/images/avatar/18.jpg",
      "name": "Troy S. Gaines"
    },
    {
      "image": "assets/images/avatar/19.jpg",
      "name": "Robin K. Miller"
    },
    {
      "image": "assets/images/avatar/20.jpg",
      "name": "Willie K. Rothermel"
    },
  ];

  chatList: any[] = [
    {
      "from": "a",
      "message": "Hello there. Thanks for the follow. Did you notice, that I am an egg? A talking egg? Damn!😄😄"
    },
    {
      "from": "b",
      "message": "	😃	😃	😃Yeah that is crazy, but people can change their own picture and build their own Twitter conversation with this generator, so it does not matter that you are an egg",
    },
    {
      "from": "a",
      "message": "Thanks mate! Feel way better now. Oh, and guys, these messages will be removed once your add your own :-)"
    },
    {
      "from": "b",
      "message": "You can then edit a message by clicking on it. This way you can change the text, status (check marks) and time. You can also determine whether the message was sent by the sender (right) or receiver (left)."
    },
    {
      "from": "a",
      "message": "😀😀You can change the order of messages by dragging and dropping them."
    },
    {
      "from": "b",
      "message": "Finally, click  (top right) to download your fake chat as an image."
    },
    {
      "from": "a",
      "message": "😀😀Thanks mate! Feel way better now. Oh, and guys, these messages will be removed once your add your own :-)"
    },
    {
      "from": "b",
      "message": "You also have the facility to hide the header and footer if needed."
    },
    {
      "from": "a",
      "message": "😀😀😀Customize the clock time and battery percentage as per your satisfaction."
    },
    {
      "from": "b",
      "message": "Now, make all the required changes for Person 2 also."
    },
    {
      "from": "a",
      "message": "If satisfied, download the chat and share with all your close friends and relatives, and note their reactions."
    },
    {
      "from": "b",
      "message": "😀😀Privacy comes first. Our tool does not store any data or chats by keeping in mind the privacy of our users"
    },
    {
      "from": "a",
      "message": "😀😀😀😀Our android text generator tool has an easy-to-use interface for the ease of the users. Also, the results generated by our tool are fast and realistic"
    },
    {
      "from": "b",
      "message": "Message privately. End-to-end encryption and privacy controls. Stay connected. Message and call for free* around the world. Build community. Group conversations made simple. Express yourself. Say it with stickers, voice, GIFs and more. WhatsApp business. Reach your customers from anywhere."
    },
    {
      "from": "a",
      "message": "Send a single message to multiple people at once"
    },
    {
      "from": "b",
      "message": "You can now send messages in bold, italics or strikethrough too. Simply use the special characters before and after the words to get the formatting of your choice"
    },
    {
      "from": "a",
      "message": "If you want to know who you are chatting too much with on WhatsApp, you can find out by simply scrolling through the chat screen"
    }
  ];
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private router: Router,
    private zone: NgZone,
  ) { }

//  getManicureList(){
//    return this.manicureList;
//  }
//
//  getPedicureList(){
//    return this.pedicureList;
//  }

  navigateToPage(routes: any, param?: NavigationExtras | undefined) {
    this.zone.run(() => {
      console.log(routes, param);
      this.router.navigate([routes], param);
    });
  }

  navigateToProduct(id: number, name: string) {
    this.zone.run(() => {
      this.router.navigate(['product-details', id, name]);
    });
  }

  navigateRoot(routes: any | string) {
    this.zone.run(() => {
      this.navCtrl.navigateRoot([routes]);
    });
  }

  getKeys(key: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve(localStorage.getItem(key))
    });
  }

  clearKeys(key: string) {
    // this.storage.remove(key);
    localStorage.removeItem(key);
  }

  setKeys(key: string, value: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve(localStorage.setItem(key, value));
    });
  }

  async show(msg?: string | null) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      cssClass: 'custom-loader',
      spinner: null,
      // message: msg && msg != '' && msg != null ? msg : '',
      // spinner: 'bubbles',
    }).then(a => {
      a.present().then(() => {
        //console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async hide() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  /*
    Show Warning Alert Message
    param : msg = message to display
    Call this method to show Warning Alert,
    */
  async showWarningAlert(msg: any) {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showSimpleAlert(msg: any) {
    const alert = await this.alertCtrl.create({
      header: '',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  /*
   Show Error Alert Message
   param : msg = message to display
   Call this method to show Error Alert,
   */
  async showErrorAlert(msg: any) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  /*
     param : email = email to verify
     Call this method to get verify email
     */
  async getEmailFilter(email: string) {
    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!(emailfilter.test(email))) {
      const alert = await this.alertCtrl.create({
        header: 'Warning',
        message: 'Please enter valid email',
        buttons: ['OK']
      });
      await alert.present();
      return false;
    } else {
      return true;
    }
  }


  /*
    Show Toast Message on Screen
     param : msg = message to display, color= background
     color of toast example dark,danger,light. position  = position of message example top,bottom
     Call this method to show toast message
     */

  async showToast(msg: any, colors: any, positon: any) {


    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: colors,
      position: positon
    });
    toast.present();
    await Haptics.impact({ style: ImpactStyle.Medium });
  }
  async shoNotification(msg: any, colors: any, positon: any) {

    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000,
      color: colors,
      position: positon,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
    await Haptics.impact({ style: ImpactStyle.Medium });

  }

  async errorToast(msg: any, color?: string | (string & Record<never, never>) | undefined) {

    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color ? color : 'dark'
    });
    toast.present();
    await Haptics.impact({ style: ImpactStyle.Medium });

  }

  onBack() {
    this.navCtrl.back();
  }

  makeid(length: any) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
