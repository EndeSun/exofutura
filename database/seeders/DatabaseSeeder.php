<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

//MARK: MODELS CALL
use App\Models\User;
use App\Models\Zone;
use App\Models\Registerzone;
use App\Models\Promotion;
use App\Models\Commerce;
use App\Models\Registercommerce;

class DatabaseSeeder extends Seeder
{
    //MARK: USER SEED
    private $usuarios = [
        [
            'name' => 'Ende',
            'email' => '1195562121ende@gmail.com',
            'credits_used' => 1,
            'credits_got' => 2,
            'password' => 'ende1234'
        ],
        [
            'name' => 'Jack',
            'email' => 'jack@gmail.com',
            'credits_used' => 0,
            'credits_got' => 5,
            'password' => 'jack1234'
        ],
        [
            'name' => 'Luis',
            'email' => 'luis@gmail.com',
            'credits_used' => 3,
            'credits_got' => 0,
            'password' => 'luis1234'
        ]
    ];

    private function seedUsers()
    {
        DB::table('users')->delete();
        foreach ($this->usuarios as $usuario) {
            $u = new User;
            $u->name = $usuario['name'];
            $u->email = $usuario['email'];
            $u->credits_used = $usuario['credits_used'];
            $u->credits_got = $usuario['credits_got'];
            $u->password = bcrypt($usuario['password']);
            $u->save();
        }
    }

    //MARK: ZONES SEED
    private $zones = [
        [
            'latitude' => 20,
            'longitude' => 40,
            'radius' => 5,
            'description' => 'Sitio muy bonito 1',
            'content' => 'Contenido multimedia del sitio muy bonito 1'
        ],
        [
            'latitude' => 30,
            'longitude' => 60,
            'radius' => 5,
            'description' => 'Sitio muy bonito 2',
            'content' => 'Contenido multimedia del sitio muy bonito 2'
        ],
        [
            'latitude' => 5,
            'longitude' => 80,
            'radius' => 10,
            'description' => 'Sitio muy bonito 3',
            'content' => 'Contenido multimedia del sitio muy bonito 3'
        ]
    ];

    private function seedZones()
    {
        DB::table('zones')->delete();
        foreach ($this->zones as $zone) {
            $z = new Zone;
            $z->latitude = $zone['latitude'];
            $z->longitude = $zone['longitude'];
            $z->radius = $zone['radius'];
            $z->description = $zone['description'];
            $z->content = bcrypt($zone['content']);
            $z->save();
        }
    }

    //MARK: REGISTERZONES SEED
    private $registerzones = [
        [
            'user_id' => 1,
            'zone_id' => 1,
            'unlocked' => true
        ],
        [
            'user_id' => 1,
            'zone_id' => 2,
            'unlocked' => true

        ],
        [
            'user_id' => 1,
            'zone_id' => 3,
            'unlocked' => true
        ],
        [
            'user_id' => 2,
            'zone_id' => 1,
            'unlocked' => true
        ],
        [
            'user_id' => 3,
            'zone_id' => 1,
            'unlocked' => true
        ],
        [
            'user_id' => 3,
            'zone_id' => 2,
            'unlocked' => true
        ]
    ];

    private function seedRegisterZones()
    {
        DB::table('registerzones')->delete();
        foreach ($this->registerzones as $registerzone) {

            $rz = new Registerzone;
            $rz->user_id = $registerzone['user_id'];
            $rz->zone_id = $registerzone['zone_id'];
            $rz->unlocked = $registerzone['unlocked'];
            $rz->save();

        }
    }

    //MARK: PROMOTIONS SEED
    private $promotions = [
        [
            'title' => "Promoción 2x1",
            'description' => "Promoción 2x1 en cervezas",
            'content' => "Contenido de la promoción 2x1",
            'credits' => 1
        ],
        [
            'title' => "Descuento 10%",
            'description' => "Descuento del 10% en todos los accesorios",
            'content' => "Contenido de la promoción descuento 10%",
            'credits' => 2
        ],
        [
            'title' => "Descuento 20%",
            'description' => "Descuento del 20% en todos los productos",
            'content' => "Contenido de la promoción descuento 20%",
            'credits' => 3
        ]
    ];

    private function seedPromotions()
    {
        DB::table('promotions')->delete();
        foreach ($this->promotions as $promotion) {
            $promo = new Promotion;
            $promo->title = $promotion['title'];
            $promo->description = $promotion['description'];
            $promo->content = $promotion['content'];
            $promo->credits = $promotion['credits'];
            $promo->save();
        }
    }

    //MARK: COMMERCES SEED
    private $commerces = [
        [
            'promotion_id' => 1,
            'name' => "Cervecería Ende",
            'description' => "Vendemos todo tipo de cervezas artesanales"
        ],
        [
            'promotion_id' => 2,
            'name' => "Accesorios Jack",
            'description' => "Vendemos todo tipo de accesorios industriales"
        ],
        [
            'promotion_id' => 3,
            'name' => "Productos Luisjo",
            'description' => "Vendemos todo tipo de productos fisioterapeuticos"
        ]
    ];

    private function seedCommerces()
    {
        DB::table('commerces')->delete();
        foreach ($this->commerces as $commerce) {
            $commer = new Commerce;
            $commer->promotion_id = $commerce['promotion_id'];
            $commer->name = $commerce['name'];
            $commer->description = $commerce['description'];
            $commer->save();
        }
    }

    //MARK: REGISTERCOMMERCES SEED
    // $table->foreignId('user_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
    // $table->foreignId('commerce_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
    private $registercommerces = [
        [
            'user_id' => 1,
            'commerce_id' => 1,
        ],
        [
            'user_id' => 2,
            'commerce_id' => 2,
        ],
        [
            'user_id' => 3,
            'commerce_id' => 3,
        ],
    ];

    private function seedRegistercommerces()
    {
        DB::table('registercommerces')->delete();
        foreach ($this->registercommerces as $registercommerce) {
            $regcommer = new Registercommerce;
            $regcommer->user_id = $registercommerce['user_id'];
            $regcommer->commerce_id = $registercommerce['commerce_id'];
            $regcommer->save();
        }
    }



    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        self::seedUsers();
        $this->command->info("Tabla usuarios inicializada con datos!");

        self::seedZones();
        $this->command->info("Tabla zones inicializada con datos!");

        self::seedRegisterZones();
        $this->command->info("Tabla registerzone inicializada con datos!");

        self::seedPromotions();
        $this->command->info("Tabla promotions inicializada con datos!");

        self::seedCommerces();
        $this->command->info("Tabla commerces inicializada con datos!");

        self::seedRegistercommerces();
        $this->command->info("Tabla registercommerces inicializada con datos!");


    }
}
