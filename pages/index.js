import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import prisma from 'lib/prisma'

export default function Home( {cars, firstCar} ) {

  return <div className={styles.container}>
      <p>
        First car: {firstCar.brand} - {firstCar.model}
      </p>
      <ul>
        { cars.map( (car) => {
          return (
            <li key={car.id}>
              {car.brand} - {car.model}
            </li>
          )
        })}
      </ul>
    </div>
}

export async function getServerSideProps() {

  let cars = await prisma.car.findMany();
  let firstCar = await prisma.car.findUnique( {
    where: {
      id: 1
    }
  })

  // We need to convert the date to a string - see README.md...
  cars = JSON.parse(JSON.stringify(cars));

  firstCar = JSON.parse(JSON.stringify(firstCar));

  // Since the name of the prop is the same as the object, the shortened version
  // is valid - e.g. instead of cars: cars, just specify cars.
  return {
    props: {
      cars: cars,
      firstCar
    }
  }
}
