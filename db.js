// db.js
import express from 'express';

export const books = [
    {
      code: 'B001',
      name: 'Mahalal',
      category: 'Emotion',
      price: 65.00,
      isBorrowed: true,
      borrowingHistory: [
        { dateBorrowed: '2023-10-01', customerCode: 'C101' },
        { dateBorrowed: '2024-01-15', customerCode: 'C105' }
      ]
    },
    {
      code: 'B002',
      name: 'Istark',
      category: 'Emotion',
      price: 58.50,
      isBorrowed: false,
      borrowingHistory: [
        { dateBorrowed: '2024-03-20', customerCode: 'C108' }
      ]
    },
    {
      code: 'B003',
      name: 'Yozvad',
      category: 'Emotion',
      price: 72.90,
      isBorrowed: true,
      borrowingHistory: [
        { dateBorrowed: '2024-02-10', customerCode: 'C102' }
      ]
    },
    {
      code: 'B004',
      name: 'Zero Range',
      category: 'Suspense',
      price: 89.90,
      isBorrowed: false,
      borrowingHistory: [
        { dateBorrowed: '2023-11-05', customerCode: 'C103' },
        { dateBorrowed: '2024-04-01', customerCode: 'C106' }
      ]
    },
    {
      code: 'B005',
      name: 'Wanted',
      category: 'Suspense',
      price: 79.90,
      isBorrowed: true,
      borrowingHistory: [
        { dateBorrowed: '2024-01-25', customerCode: 'C104' }
      ]
    },
    {
      code: 'B006',
      name: 'Silent Scream', // ספר מתח נוסף להשלמת ה-6
      category: 'Suspense',
      price: 85.00,
      isBorrowed: false,
      borrowingHistory: []
    }
  ];
  
