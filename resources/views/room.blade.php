<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Sala') }} {{$room->id}}
        </h2>
    </x-slot>

    {{-- @foreach($rooms as $room) --}}
    {{-- {{dump($room)}} --}}
    {{-- <a href="/rooms/{{ $room['id'] }}"> Sala {{ $room['id'] }}</a> --}}

        {{-- <ul>
            <li>
            </li>
        </ul> --}}
    {{-- @endforeach --}}


    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    {{-- {{dump($users)}}
                    {{dump($room)}} --}}

                    <ul>
                    @foreach ( $users as $user)
                        <li class="flex items center w-100">
                            <div class="flex-1">
                                <p>{{ $user->name }}</p>
                            </div>
                            <div class="flex-1">
                                <p>{{ $user->email }}</p>
                            </div>
                            <div class="flex-1">
                                <p>{{ $user->created_at }}</p>
                            </div>
                        </li>
                    @endforeach
                </ul>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>
