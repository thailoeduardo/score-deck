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
<div class="flex min-h-[6rem] max-w-4xl min-w-[18rem] flex-wrap items-center justify-center gap-2 overflow-x-hidden mx-auto ">
    <div class="w-full max-w-lg">
        <ul class="list bg-base-100 rounded-box shadow-md">

            {{-- <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li> --}}

            <li class="list-row">
            <div class="text-4xl font-thin opacity-30 tabular-nums">01</div>
            <div>
                {{-- <img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/> --}}
                <div class="avatar">
                    <div class="mask mask-hexagon w-8">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
            </div>
            <div class="list-col-grow">
                {{-- <div>Dio Lupa</div> --}}
                <div class="text-xs uppercase font-semibold opacity-60">Remaining Reason</div>
            </div>
            <button class="btn btn-square btn-ghost">
                <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
            </button>
            </li>

            <li class="list-row">
            <div class="text-4xl font-thin opacity-30 tabular-nums">02</div>
            <div><img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/4@94.webp"/></div>
            <div class="list-col-grow">
                <div>Ellie Beilish</div>
                <div class="text-xs uppercase font-semibold opacity-60">Bears of a fever</div>
            </div>
            <button class="btn btn-square btn-ghost">
                <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
            </button>
            </li>

            <li class="list-row">
            <div class="text-4xl font-thin opacity-30 tabular-nums">03</div>
            <div><img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/3@94.webp"/></div>
            <div class="list-col-grow">
                <div>Sabrino Gardener</div>
                <div class="text-xs uppercase font-semibold opacity-60">Cappuccino</div>
            </div>
            <button class="btn btn-square btn-ghost">
                <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
            </button>
            </li>

        </ul>
    </div>
</div>
</x-app-layout>
