import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Flex, 
  Image, 
  Text, 
  SimpleGrid, 
  Spinner, 
  Alert, 
  AlertIcon, 
  Button, 
  Stack, 
  Badge, 
  useToast, 
  IconButton, 
  HStack 
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { FaShoppingCart } from 'react-icons/fa';

export default function ProductSec() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh" backgroundColor="#F7F9FC">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh" backgroundColor="#F7F9FC">
        <Alert status="error" borderRadius="md" boxShadow="lg">
          <AlertIcon />
          {error}
        </Alert>
      </Flex>
    );
  }

  return (
    <Box padding="20px" backgroundColor="#F7F9FC" minHeight="100vh">
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="3xl" fontWeight="bold" color="teal.600">Products</Text>
        <Flex alignItems="center">
          <IconButton 
            icon={<FaShoppingCart />} 
            colorScheme="teal" 
            variant="outline"
            aria-label="Cart"
          />
          {cart.length > 0 && (
            <Text marginLeft="8px" fontSize="lg" color="teal.600">
              {cart.length} items
            </Text>
          )}
        </Flex>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="20px" marginTop="20px">
        {products.map((product) => (
          <Box
            key={product.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            padding="15px"
            backgroundColor="white"
            _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}
            position="relative"
          >
            <Badge position="absolute" top="10px" right="10px" colorScheme="green">
              New
            </Badge>
            <Image 
              src={product.image} 
              alt={product.title} 
              boxSize="200px" 
              objectFit="contain" 
              margin="auto" 
              mb="10px"
            />
            <Stack spacing="3">
              <Text fontWeight="bold" fontSize="lg" color="teal.700" isTruncated>{product.title}</Text>
              <HStack justifyContent="center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} color={i < 4 ? 'teal.500' : 'gray.300'} />
                ))}
              </HStack>
              <Text color="gray.600" fontSize="md">${product.price.toFixed(2)}</Text>
              <Button 
                colorScheme="teal" 
                onClick={() => handleAddToCart(product)}
                _hover={{ backgroundColor: "teal.600" }}
              >
                Add to Cart
              </Button>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
  