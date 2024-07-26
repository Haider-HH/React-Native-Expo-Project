import { View, Text, Image } from 'react-native'
import React from 'react'

interface productsProps {
    image: string,
    title: string,
    price: number,
    imageStyling: object,
    titleStyling: object,
    priceStyling: object,
    containerStyling: object,
}

const ProductList: React.FC<productsProps> = ({image, title, price, imageStyling, titleStyling, priceStyling, containerStyling}) => {
  return (
    <View style={containerStyling}>
      <Image 
        source={{uri: image}}
        style={imageStyling}
      />
      <Text style={titleStyling}>
        {title}
      </Text>
      <Text style={priceStyling}>${price}</Text>
    </View>
  )
}

export default ProductList