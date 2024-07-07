<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->sentence(),
            'description' => $this->faker->realText(),
            'price' => $this->faker->randomFloat(2, 10000, 100000), 
            'category' => $this->faker->word(),
            'stock' => $this->faker->numberBetween(5, 100), 
            'image' => $this->faker->imageUrl(), 
        ];
    }
}
