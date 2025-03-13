@section('title', 'Dashboard')

<x-app-layout>
    <div class="avatar">
        <div class="mask mask-hexagon w-24">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>

      <div class="p-4">
        <button class="btn btn-neutral">Neutral</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-error">Error</button>
      </div>

    {{-- <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot> --}}


    {{-- <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xs sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    @foreach ($totalPoints as $room)
                        <h3>Sala {{ $room['room_id'] }}</h3>

                        @foreach ($room['points'] as $player)
                            <p>{{ $player->user->name }} - Pontos: {{ $player->total_points }}</p>
                        @endforeach
                    @endforeach

                    <div>

                    </div>
                </div>
            </div>
        </div>
    </div> --}}
</x-app-layout>
