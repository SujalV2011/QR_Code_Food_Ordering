// import React from 'react';
// import './FoodItem.css';
// import { Container, Row, Col, Card } from 'react-bootstrap';

// const foodItems = [
//   { id: 1, name: 'Pizza', description: 'Delicious cheese pizza', imageUrl: 'pizza.jpg' },
//   { id: 2, name: 'Burger', description: 'Juicy beef burger', imageUrl: 'burger.jpg' },
//   { id: 3, name: 'Pasta', description: 'Creamy Alfredo pasta', imageUrl: 'pasta.jpg' },
//   { id: 4, name: 'Salad', description: 'Healthy green salad', imageUrl: 'salad.jpg' },
//   { id: 5, name: 'Sushi', description: 'Fresh sushi rolls', imageUrl: 'sushi.jpg' },
//   { id: 6, name: 'Steak', description: 'Tender grilled steak', imageUrl: 'steak.jpg' },
//   { id: 7, name: 'Tacos', description: 'Spicy chicken tacos', imageUrl: 'tacos.jpg' },
//   { id: 8, name: 'Ice Cream', description: 'Sweet vanilla ice cream', imageUrl: 'icecream.jpg' },
//   { id: 9, name: 'Fries', description: 'Crispy French fries', imageUrl: 'fries.jpg' },
//   { id: 10, name: 'Sandwich', description: 'Tasty ham sandwich', imageUrl: 'sandwich.jpg' },
// ];

// const FoodItems = () => {
//   return (
//     <Container>
//       <Row>
//         {foodItems.map((item) => (
//           <Col key={item.id} sm={12} md={4} lg={4}>
//             <Card className="mb-4">
//               <Card.Img variant="top" src={item.imageUrl} />
//               <Card.Body>
//                 <Card.Title>{item.name}</Card.Title>
//                 <Card.Text>{item.description}</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default FoodItems;
