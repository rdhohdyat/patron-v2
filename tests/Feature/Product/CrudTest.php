<?php

namespace Tests\Feature\Product;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Http\Controllers\StoreController;
use Tests\TestCase;

class CrudTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(["role" => "admin"]);
    }

    public function test_access_market(): void
    {
        $this->actingAs($this->admin);
        $response = $this->get('/admin/market');

        $response->assertStatus(200);
    }
    public function test_add_market(): void
    {    
        $this->actingAs($this->admin);
    
        $response = $this->post(route('market.store'), [
            'nama_market' => 'My Store',
            'lokasi_market' => 'Downtown',
            'image' => 'store_image_url.jpg'
        ]);
    
        $response->assertStatus(201);
    
        $this->assertDatabaseHas('markets', [
            'nama_market' => 'My Store',
            'lokasi_market' => 'Downtown',
            'image' => 'store_image_url.jpg'
        ]);
    }


}
