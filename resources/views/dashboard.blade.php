@section('title', 'Dashboard')

<x-app-layout>
    @foreach ($totalPoints as $room)
        <div class="flex min-h-[6rem] max-w-4xl min-w-[18rem] flex-wrap items-center justify-center gap-2 overflow-x-hidden mx-auto mb-8">
            <div class="w-full max-w-lg">
                <ul class="list bg-base-100 rounded-box shadow-md">
                    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Pontuacão Sala {{ $room['room_id'] }}</li>

                    @foreach ($room['points'] as $player)
                        <li class="list-row items-center">
                            <div>
                                <div class="avatar">
                                    <div class="mask mask-hexagon w-12">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                            </div>

                            <div class="list-col-grow">
                                <div>{{ $player->user->name }}</div>
                            </div>

                            <div class="text-4xl font-thin opacity-30 tabular-nums">{{ $player->total_points }}</div>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
    @endforeach
</x-app-layout>
