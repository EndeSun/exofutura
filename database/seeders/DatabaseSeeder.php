<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

//MARK: MODELS CALL
use App\Models\User;


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
        foreach($this->usuarios as $usuario){
            $u = new User;
            $u->name = $usuario['name'];
            $u->email = $usuario['email'];
            $u->credits_used = $usuario['credits_used'];
            $u->credits_got = $usuario['credits_got'];
            $u->password = bcrypt($usuario['password']);
            $u->save();
        }
    }

    //MARK: OTHER SEED


    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        self::seedUsers();
        $this->command->info("Tabla usuarios inicializada con datso!");
    }
}
