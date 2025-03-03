<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    {{-- {{ __("You're logged in!") }} --}}

                    Ultimas jogadas

                    {{-- {{ dump( $matches ) }} --}}
                    {{-- {{ dd(get_defined_vars()) }} --}}
                    <ul>
                        {{-- @foreach ($rooms as $room)
                            <li>{{ $room->id }} - @if ($room->is_closed) <span class="text-red-500">Aberto</span> @else <span class="text-green-500">Fechado</span> @endif</li>
                        @endforeach --}}


                        @foreach ($matches as $matche)
                            <li>{{ $matche->id }} - {{ $matche->matche_id }} - {{ $matche->player_id }} - {{ $matche->points }}</li>
                        @endforeach
                    </ul>

                    <a href="/registrar-partida">Registar pontos</a>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
