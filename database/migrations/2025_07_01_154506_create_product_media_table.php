<?php

use App\Enums\MediaProviderEnum;
use App\Enums\MediaTypeEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('product_media', static function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('provider')->default(MediaProviderEnum::LOCAL);
            $table->string('path');
            $table->integer('order')->default(0);
            $table->string('type')->default(MediaTypeEnum::IMAGE);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_media');
    }
};
