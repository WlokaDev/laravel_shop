<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', static function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('status');
            $table->string('slug')->nullable()->index();
            $table->text('description')->nullable();
            $table->integer('price')->nullable();
            $table->integer('discounted_price')->nullable();
            $table->string('sku')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['sku', 'deleted_at'], 'unique_sku_deleted_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
